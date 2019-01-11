import { Injectable } from '@angular/core';
import { Resolve, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class AppResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(): Promise<FirebaseUserModel> {   
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(res => {
          return resolve(res);
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        })
    })
  }
}
