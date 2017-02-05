import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthModule } from './modules/auth.module';
import { MomentModule } from 'angular2-moment';

import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostQuestionPageComponent } from './pages/post-question-page/post-question-page.component';
import { HeaderComponent } from './controls/shared/header/header.component';
import { QuestionsListComponent } from './controls/shared/questions-list/questions-list.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { QuestionDetailsComponent } from './controls/shared/question-details/question-details.component';

// Site routing
const appRoutes: Routes = [
  { path: '',                 component: HomePageComponent },
  { path: 'post/question',    component: PostQuestionPageComponent, canActivate: [AuthGuardService] },
  { path: 'question/:id',     component: QuestionPageComponent },
  { path: '**',               component: NotFoundPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    HomePageComponent,
    PostQuestionPageComponent,
    HeaderComponent,
    QuestionsListComponent,
    QuestionPageComponent,
    QuestionDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AuthModule,
    MomentModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
