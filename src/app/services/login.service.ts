import { ILogin } from './../model/ilogin';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userLogin: ILogin | null = null;
  constructor() {}
  login(user: string, pass: string) {
    this.userLogin = {
      username: user,
      password: pass,
    };
  }
  get isLoggedIn() {
    if (this.userLogin?.username && this.userLogin.password) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.userLogin = null;
  }
}
