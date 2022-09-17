import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { User, UserModel } from "../models/user.model";
import { BehaviorSubject, throwError } from "rxjs";
import { environment } from "../../environments/environment";

interface AuthResponse {
  kind: string;
  idToken: string;
  refreshToken: string;
  email: string;
  displayName: string,
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataKey = 'userData';
  private apiKey: string;
  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
    this.apiKey = environment.apiKey;
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.httpClient.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      {
        displayName: `${firstName} ${lastName}`.trim(),
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap(this.handleAuthentication).bind(this),
        catchError(this.handleErrors));
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleErrors));
  }

  tryLoginPersisted() {
    const userData: UserModel = JSON.parse(localStorage.getItem(this.userDataKey));

    if (!userData) {
      return;
    }

    const user = new User(
      userData.id,
      userData.userName,
      userData.email,
      userData._token,
      null,
      userData.expirationDate);

    if (!user || !user.token) {
      localStorage.removeItem(this.userDataKey);
      return;
    }

    this.user.next(user);
  }

  logout() {
    localStorage.removeItem(this.userDataKey);
    this.user.next(null);
  }

  private handleErrors(errorResponse: HttpErrorResponse) {
    const errorMessages = [];

    for (const error of errorResponse?.error?.error?.errors?.map(e => e.message)) {
      switch (error) {
        case 'EMAIL_EXISTS':
          errorMessages.push('This email is already registered.');
          break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          errorMessages.push('Invalid email or password.');
          break;
        case undefined:
          continue;
        default:
          errorMessages.push(error);
      }
    }

    if (errorMessages.length === 0) {
      errorMessages.push('An unknown error has occurred.');
    }

    return throwError(errorMessages);
  }

  private handleAuthentication(authResponse: AuthResponse) {
    const user = new User(
      authResponse.localId,
      authResponse.displayName,
      authResponse.email,
      authResponse.idToken,
      +authResponse.expiresIn);

    localStorage.setItem('userData', JSON.stringify(user));

    this.user.next(user);
  }
}
