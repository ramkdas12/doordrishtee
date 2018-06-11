import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { error } from 'util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  title = 'Enter your details to register';

  validateForm: FormGroup;

  serviceError = false;

  showSpinner = false;

  showError = false;

  grecaptcha = window['grecaptcha'];

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  submitForm(): void {
    
    var test = this.grecaptcha.getResponse();
    console.log(this.validateForm);
    this.validateForm.value.captcha = test;
    if (!this.validateForm.value.captcha)  {
      this.showError = true;
      return;   
    } else {
      this.showError = false;
    }
    if (this.validateForm.status.toUpperCase() === 'VALID') {
      this.validateForm.disable({ onlySelf: true });
      this.showSpinner = true;
      this._dataService.postData('connectionTest', "")
        .subscribe(success => {
          var CryptoJS = window['CryptoJS'];
          var encrypted = CryptoJS.AES.encrypt(this.validateForm.value.password, success['data']);
          this.validateForm.value.password = encrypted.toString();
          this.validateForm.value.checkPassword = success['data'];
          this.validateForm.value.captcha = test;
          this._dataService.postData('signup', this.validateForm.value)
            .subscribe(success => {
              if (success['status'] === 200) {

              } else {

              }
              this.showSpinner = false;
              console.log(success);
            },
              error => {
                this.validateForm.enable({ onlySelf: true });
                this.showSpinner = false;
                this.serviceError = true;
                console.log(error);
              });
        },
          error => {
            this.validateForm.enable({ onlySelf: true });
            this.showSpinner = false;
            this.serviceError = true;
            console.log(error);
          });
    }
  }

  constructor(private fb: FormBuilder, private _dataService: DataService) {
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, { validators: Validators.required, asyncValidators: [this.validateEmailNotTaken.bind(this)], updateOnBlur: true }],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      alias: [null, { validators: Validators.required, asyncValidators: [this.validateAliasNotTaken.bind(this)], updateOnBlur: true }],
      agree: [false]
    });
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this._dataService.postData('checkEmail', control.value).map(res => {
      console.log(res);
      return res['data'] ? { emailTaken: true } : null;
    });
  }

  validateAliasNotTaken(control: AbstractControl) {
    return this._dataService.postData('checkAlias', control.value).map(res => {
      console.log(res);
      return res['data'] ? { aliasTaken: true } : null;
    });
  }

}
