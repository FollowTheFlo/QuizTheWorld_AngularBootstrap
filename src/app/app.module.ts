import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SparqlService } from './services/sparql.service';
import { QuizService } from './services/quiz.service';
import { QuestionService } from './services/question.service';
import { AppComponent } from './app.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizesListComponent } from './quizes-list/quizes-list.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { QuizRunComponent } from './quiz-run/quiz-run.component';
import {NgPipesModule} from 'ngx-pipes';




@NgModule({
  declarations: [
    AppComponent,
    QuizCreateComponent,
    QuizesListComponent,
    QuestionsListComponent,
    ArticleDetailsComponent,
    QuizRunComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    NgPipesModule
    
  ],
  providers: [SparqlService,QuizService,QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
