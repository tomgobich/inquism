import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  questions: FirebaseListObservable<any>

  constructor(private af: AngularFire) {
    this.questions = af.database.list('/questions');
  }

  ngOnInit() {
  }

}
