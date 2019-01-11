import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string;
  model: any = {};

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  tryFacebookLogin() {
    this.authService.facebookLogin()
      .then( res => {
        this.router.navigate(['/']);
      })
  }

  tryGoogleLogin() {
    this.authService.googleLogin()
      .then(res => {
        this.router.navigate(['/']);
      })
  }

  login(value) {
    this.authService.login(value).then(res => {
      this.router.navigate(['/']);
    }, err => {
      this.errorMsg = err.message;
      console.log(this.errorMsg);
    });
  }
}
