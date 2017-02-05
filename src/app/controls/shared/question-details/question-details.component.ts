import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  @Input() question: any;
  @Input() anchored: boolean;

  constructor() { }

  ngOnInit() {
  }

}
