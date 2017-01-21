import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

import { AppComponent } from './app.component';

// Site routing
// const appRoutes: Routes = [
//   {
//     path: '',
//     component: HomePageComponent
//   },
//   {
//     path: 'post/question',
//     component: PostQuestionPageComponent,
//     canActivate: [AuthGuardService]
//   },
// ];

var firebaseConfig = {
  apiKey: "AIzaSyCM_gEezgMewcM20fvLj4iduFAZpqYF3_g",
  authDomain: "inquism-8e3e6.firebaseapp.com",
  databaseURL: "https://inquism-8e3e6.firebaseio.com",
  storageBucket: "inquism-8e3e6.appspot.com",
  messagingSenderId: "421979106846"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
