import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';

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
    if (this.validateForm.status.toUpperCase() !== 'INVALID') {
      console.log(this.validateForm.value);
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/)]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
