import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  questionID: string;
  question: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire, private route: ActivatedRoute) {
    this.questionID = route.snapshot.params['id'];
    this.question   = af.database.object(`/questions/${this.questionID}`);
    this.question.subscribe(e => console.debug(e));
  }

  ngOnInit() {
  }

}
