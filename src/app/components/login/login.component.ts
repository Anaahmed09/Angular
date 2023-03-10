import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private LoginService: LoginService, private router: Router) {}
  username: string = '';
  password: string = '';
  messageError: boolean = false;
  loginForm = new FormGroup({
    user: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[a-z]*$/i),
    ]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  get user() {
    return this.loginForm.controls.user;
  }
  get pass() {
    return this.loginForm.controls.pass;
  }
  login(e: Event) {
    e.preventDefault();
    if (this.loginForm.status === 'VALID') {
      this.LoginService.login(this.username, this.password);
      this.router.navigate(['/products']);
    }
  }
}
