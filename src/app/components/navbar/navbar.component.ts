import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private LoginService: LoginService) {}
  get isLogged() {
    return this.LoginService.isLoggedIn;
  }
  get getUsername() {
    return this.LoginService.userLogin?.username;
  }
  logOut() {
    this.LoginService.logout();
  }
}
