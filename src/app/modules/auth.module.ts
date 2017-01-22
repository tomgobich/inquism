import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';


// Export Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyCM_gEezgMewcM20fvLj4iduFAZpqYF3_g",
  authDomain: "inquism-8e3e6.firebaseapp.com",
  databaseURL: "https://inquism-8e3e6.firebaseio.com",
  storageBucket: "inquism-8e3e6.appspot.com",
  messagingSenderId: "421979106846"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  exports: [
    BrowserModule
  ]
})
export class AuthModule { }