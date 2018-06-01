import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

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

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status.toUpperCase() !== 'INVALID') {
      this.validateForm.disable({ onlySelf: true });
      this.showSpinner = true;
      this._dataService.postData('connectionTest', "")
        .subscribe(success => {
          let test = this.validateForm.value.password.split('');
          console.log(success);
          let testing = success['data'].split('');
          var testLength = test.length + testing.length;
          var pass = [];
          for (let i = 0, j = 0, k = 0; i < testLength; i++) {
            if ( i % 2 ) {
              if (j < test.length) {
                pass.push(test[j]);
              } else {
                pass.push('');
              }
              j++;
            } else {
              if (k < testing.length) {
                pass.push(testing[k]);
              } else {
                pass.push('');
              }
              k++;
            }
          }
          this.validateForm.value.password = pass.join('');
          this.validateForm.value.checkPassword = success['data'];
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
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
  }

}
