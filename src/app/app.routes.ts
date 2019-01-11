import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
