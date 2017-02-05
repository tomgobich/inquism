import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: FirebaseListObservable<any>

  constructor(private af: AngularFire) {
    this.questions = af.database.list('/questions');
    this.questions.first().subscribe(e => console.debug(e));
  }

  ngOnInit() {
  }

}
