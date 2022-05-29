import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginModeName = 'Login';
  signUpModeName = 'Sign Up';

  authForm: FormGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'firstname': new FormControl(null, [Validators.required]),
    'lastname': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  isLogin = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  getCurrentModeName() {
    return this.isLogin ? this.loginModeName : this.signUpModeName;
  }

  getOppositeModeName() {
    return this.isLogin ? this.signUpModeName : this.loginModeName;
  }

  isInvalidEmail() {
    return this.isControlInvalid('email')
  }

  isInvalidPassword() {
    return this.isControlInvalid('password')
  }

  isInvalidUsername() {
    return this.isControlInvalid('username');
  }

  isInvalidFirstname() {
    return this.isControlInvalid('firstname');
  }

  isInvalidLastname() {
    return this.isControlInvalid('lastname');
  }

  private isControlInvalid(controlName: string) {
    const control = this.authForm.controls[controlName];
    return !control.valid && control.touched;
  }

  onSubmit() {
    console.log(this.authForm);

    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this.authForm.reset();
    }
  }
}
