import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './core/angular-material/angular-material.module';
import { rootRouterConfig } from './app.routes';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ItemsService } from './core/items.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    SignUpComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularMaterialModule
  ],
  providers: [AuthService, UserService, AppResolver, AuthGuard, ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
