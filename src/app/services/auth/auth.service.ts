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
    let provider  = AuthProviders.Google;
    let method    = AuthMethods.Popup;

    this.af.auth
      .login({ provider, method })
      .then(authUser => {
        // Look for user in database
        this.af.database.list(`/users/${authUser.uid}`).first().subscribe(user => {
          // User found? No create : Yes update
          user.length < 1 ?
            this.createUserAccount() :
            this.updateUserAccount()
        })

      }) // add check for users existance
  }

  // Logs user out of app session
  logout() {
    this.af.auth.logout().then(() => {
      this.user = null;
      console.warn('User has logged out');
    })
  }

  // Creates a user with provider info
  createUserAccount() {
    console.debug('creating user account');
    let newUser = {
      displayName: this.user.auth.displayName,
      email: this.user.auth.email,
      joinDate: firebase.database.ServerValue.TIMESTAMP,
      lastOnline: firebase.database.ServerValue.TIMESTAMP
    }

    this.af.database.object(`/users/${this.user.uid}`).set(newUser);
  }

  // Updates a user with new provider info
  updateUserAccount() {
    console.debug('updating user account');
    let updatedUser = {
      displayName: this.user.auth.displayName,
      email: this.user.auth.email,
      lastOnline: firebase.database.ServerValue.TIMESTAMP
    }

    this.af.database.object(`/users/${this.user.uid}`).update(updatedUser);
  }

  // Returns current user's ID
  getID(): string {
    return this.isAuthenticated ? this.user.uid : '';
  }

  // Returns authentication status
  isAuthenticated(): boolean {
    return this.user !== null ? true : false;
  }

  // Post a question from user
  postUserQuestion(questionID) {
    this.af.database.list(`/users/${this.user.uid}/questions`).first().subscribe(questions => {
      // Needed to just have array of key values (removes excess DB data)
      let questionsList = questions.map(question => question.$value);
      questionsList.push(questionID)

      // Push new questions list to user
      this.af.database.object(`/users/${this.user.uid}/questions`).set(questionsList);
    })
  }

}
