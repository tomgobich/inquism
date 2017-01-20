import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions: FirebaseListObservable<any>;
  usersList: any = null;
  user: any = null;

  constructor(private af: AngularFire) {
    // Load questions from database
    this.questions = af.database.list('/questions', {
      query : {
        limitToLast: 20,
        sortBy: 'postDate'
      }
    })

    // Get collection of users to push / pull from
    this.usersList = af.database.list('/users');

    // Load currently authenticated user
    af.auth.subscribe(auth => {
      auth ? this.user = auth : null;
    })
  }

  login() {
    let provider = AuthProviders.Google;
    let method = AuthMethods.Popup;
    this.af.auth
      .login({ provider, method })
      .then(authUser => {
        this.af.database.list(`/users/${this.user.uid}`)
          .subscribe(foundUser => {
            console.log({foundUser});
            if(foundUser.length > 0) {
              // User was found
              alert('user already exists');
            }
            else {
              // User was not found
              let newUser = {
                uid: this.user.uid,
                displayName: this.user.google.displayName,
                joinDate: new Date(),
              }
              this.af.database.object(`/users/${this.user.uid}`).set(newUser);
            }
          })
      })
  }

  logout() {
    this.af.auth.logout().then(() => {
      this.user = null;
      console.warn('User has logged out');
    })
  }
}
