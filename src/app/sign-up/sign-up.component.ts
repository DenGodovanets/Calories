import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  passwordForm: FormGroup;
  errorMsg: string;
  successMsg: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ])],
      password: ['', [Validators.required, Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100)]]
    },
      { validator: this.passwordMatchValidator.bind(this) }
    );
  }

  signUp(value) {
    console.log(value);
    this.authService.signUp(value).then(res => {
       console.log(res);
       this.errorMsg = '';
       this.successMsg = 'Your account has been created';
     }, err => {
       console.log(err);
       this.errorMsg = err.message;
       this.successMsg = '';
     });
  }

  tryFacebookLogin(){
    this.authService.facebookLogin()
    .then(res =>{
      this.router.navigate(['/']);
    }, err => console.log(err)
    )
  }

  tryGoogleLogin(){
    this.authService.googleLogin()
    .then(res =>{
      this.router.navigate(['/']);
    }, err => console.log(err)
    )
  }

  private passwordMatchValidator(signUpForm: FormGroup) {
    const password = signUpForm.controls.password.value;
    const confirmPassword = signUpForm.controls.confirmPassword.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
