import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  registrationSpecificControlGroupName = 'registerData';
  loginModeName = 'Login';
  signUpModeName = 'Sign Up';
  isLoginMode = true;
  isLoading = false;
  requestErrors: string[] = [];

  private alertClosedSub: Subscription;

  authForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.alertClosedSub) {
      this.alertClosedSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.removeControl(this.registrationSpecificControlGroupName);
    } else {
      this.authForm.addControl(this.registrationSpecificControlGroupName, this.getRegistrationSpecificControls());
    }
  }

  private getRegistrationSpecificControls() {
    return new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
    });
  }

  getCurrentModeName() {
    return this.isLoginMode ? this.loginModeName : this.signUpModeName;
  }

  getOppositeModeName() {
    return this.isLoginMode ? this.signUpModeName : this.loginModeName;
  }

  isInvalidEmail() {
    return this.isControlInvalid('email')
  }

  isInvalidPassword() {
    return this.isControlInvalid('password')
  }

  isInvalidFirstname() {
    return this.isControlInvalid([this.registrationSpecificControlGroupName, 'firstname']);
  }

  isInvalidLastname() {
    return this.isControlInvalid([this.registrationSpecificControlGroupName, 'lastname']);
  }

  private isControlInvalid(controlName: string | string[]) {
    const control = this.authForm.get(controlName);
    return !control.valid && control.touched;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    if (this.isLoginMode) {
      this.handleAuth(this.authService.login(email, password))
    } else {
      const firstName = this.authForm.get([this.registrationSpecificControlGroupName, 'firstname']).value;
      const lastName = this.authForm.get([this.registrationSpecificControlGroupName, 'lastname']).value;
      this.handleAuth(this.authService.signup(firstName, lastName, email, password));
    }
  }

  private handleAuth(response: Observable<any>) {
    this.isLoading = true;

    response.subscribe(response => {
      this.isLoading = false;
      this.authForm.reset();
      this.router.navigate(['/recipes']);
    }, (errors: string[]) => {
      this.isLoading = false;
      this.requestErrors = errors;
      this.showAlert(errors);
    });
  }

  private showAlert(errors: string[]) {
    const alertCmpRef = this.viewContainerRef.createComponent(AlertComponent);
    alertCmpRef.instance.messages = errors;
    this.alertClosedSub = alertCmpRef.instance.closed.subscribe(() => {
      this.alertClosedSub.unsubscribe();
      this.requestErrors = null;
      alertCmpRef.destroy();
    })
  }
}
