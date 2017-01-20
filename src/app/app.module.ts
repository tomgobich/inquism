import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';

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
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
