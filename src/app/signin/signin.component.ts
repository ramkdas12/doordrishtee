import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';

import {Router} from "@angular/router";

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  title = 'Log in to Doordrishtee';

  validateForm: FormGroup;

  serviceError = false;

  showSpinner = false;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm); 
    if (this.validateForm.status.toUpperCase() === 'VALID') {
      this.validateForm.disable({ onlySelf: true });
      this.showSpinner = true;
      this._dataService.postData('connectionTest', "")
        .subscribe(success => {
          var CryptoJS = window['CryptoJS'];
          var encrypted = CryptoJS.AES.encrypt(this.validateForm.value.password, success['data']);
          this.validateForm.value.password = encrypted.toString();
          this.validateForm.value.checkPassword = success['data'];
          this._dataService.postData('signin', this.validateForm.value)
            .subscribe(success => {
              if (success['status'] === 200) {
                this.router.navigate(['home']);
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

  constructor(private fb: FormBuilder, private _dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/)]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
