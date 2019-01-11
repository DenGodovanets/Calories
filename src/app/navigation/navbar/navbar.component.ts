import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  userIsLoggedIn(): boolean {
    return this.authService.isAuthenticated() ? true : false;
  }

  logout() {
    this.authService.logout();
  }

}
