import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import "rxjs/Rx";

@Injectable()
export class AuthService {

  questions: FirebaseListObservable<any>;
  usersList: any = null;
  user: any = null;

  // Service constructor
  constructor(private af: AngularFire) {
    // Load questions from database
    this.questions = af.database.list('/questions', {
      query : {
        limitToLast: 20,
        sortBy: 'postDate'
      }
    });

    // Get collection of users to push / pull from
    this.usersList = af.database.list('/users');

    // Load currently authenticated user
    af.auth.subscribe(auth => {
      auth ? this.user = auth : null;
    });
  }

  // Log user into app
  login() {
    let provider = AuthProviders.Google;
    let method = AuthMethods.Popup;

    this.af.auth
      .login({ provider, method })
      .then(authUser => this.createOrUpdateUserAccount())
  }

  // Logs user out of app session
  logout() {
    this.af.auth.logout().then(() => {
      this.user = null;
      console.warn('User has logged out');
    })
  }

  // Creates or updates a users data with new provider info
  createOrUpdateUserAccount() {
    let newUser = {
      displayName: this.user.google.displayName,
      joinDate: firebase.database.ServerValue.TIMESTAMP,
      lastOnline: firebase.database.ServerValue.TIMESTAMP
    }

    this.af.database.object(`/users/${this.user.uid}`).set(newUser);
  }

}
