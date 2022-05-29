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
    const emailControl = this.authForm.controls['email'];
    return !emailControl.valid && emailControl.touched;
  }

  isInvalidPassword() {
    const passwordControl = this.authForm.controls['password'];
    return !passwordControl.valid && passwordControl.touched;
  }

  onSubmit() {
    console.log(this.authForm);

    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this.authForm.reset();
    }
  }
}
