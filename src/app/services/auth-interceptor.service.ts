import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";
import { AuthService } from "./auth.service";
import { User } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor, OnDestroy {
  baseUrlPlaceholder = '{baseUrl}';
  baseUrl = 'https://my-recipes-app-backend-default-rtdb.europe-west1.firebasedatabase.app';

  userSub: Subscription;

  user: User;

  constructor(private authService: AuthService) {
     this.userSub = this.authService.user.subscribe(user => {
       console.log('Got a user: ', user);
      this.user = user;
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: req.url.replace(this.baseUrlPlaceholder, this.baseUrl),
      params: this.user ? new HttpParams().set('auth', this.user.token) : null
    });

    return next.handle(newReq);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
