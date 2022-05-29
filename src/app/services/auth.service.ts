import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface AuthResponse {
  access_token: string;
  email: string;
  expires_in: Date;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signup(username: string, firstname: string, lastname: string, email: string, password: string) {
    return this.httpClient.post<AuthResponse>('{baseUrl}/register', {
      'username': username,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'password': password,
    });
  }
}
