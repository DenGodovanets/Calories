import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  facebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          localStorage.setItem('isUserAuthenticated', 'true');
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  googleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          localStorage.setItem('isUserAuthenticated', 'true');
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  isAuthenticated() {
    return localStorage.getItem('isUserAuthenticated') === 'true';
  }

  signUp(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.router.navigate(['/']);
        }, err => reject(err));
    });
  }

  login(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          localStorage.setItem('isUserAuthenticated', 'true');
        }, err => reject(err));
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);
        resolve();
        localStorage.setItem('isUserAuthenticated', 'false');
      } else {
        reject();
      }
    });
  }
}
