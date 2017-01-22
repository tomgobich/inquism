import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TagsValidator } from '../../validators/tags.validator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-post-question-page',
  templateUrl: './post-question-page.component.html',
  styleUrls: ['./post-question-page.component.scss']
})
export class PostQuestionPageComponent implements OnInit {

  questions: FirebaseListObservable<any[]>;
  tags: FirebaseListObservable<any[]>;
  questionForm: FormGroup;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.questions  = af.database.list('/questions');
    this.tags       = af.database.list('/tags');
  }

  ngOnInit() {
    this.questionForm = new FormGroup({
      question: new FormControl('', [Validators.required, Validators.minLength(6)]),
      tags: new FormControl('', TagsValidator.prototype.checkIsValid())
    });
  }



  // ---------------------------------------------
  // Handles questionForm submission
  // ---------------------------------------------
  onSubmit(event, questionForm) {
    event.preventDefault();

    if(questionForm.valid) {
      let question  = questionForm.value.question;
      let tags      = questionForm.value.tags.split(" ");
      let postDate  = new Date();
      let user      = this.authService.getID();

      if(user) {
        let newQuestion = this.questions.push({ question, tags, postDate, user }).key;
        this.authService.postUserQuestion(newQuestion);
      }
      else {
        console.warn('user is not logged in');
      }
    }
    else {
      console.warn('form is invalid');
    }
  }

}
