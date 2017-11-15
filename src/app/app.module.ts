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
import { CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuizRunComponent } from './quiz-run/quiz-run.component';
import {NgPipesModule} from 'ngx-pipes';
import { QuizSaveComponent } from './quiz-save/quiz-save.component';
import  {DataStorageService} from './services/data-storage.service';
import  {UserService} from './services/user.service';
import { IntroComponent } from './intro/intro.component';




@NgModule({
  declarations: [
    AppComponent,
    QuizCreateComponent,
    QuizesListComponent,
    QuestionsListComponent,
    ArticleDetailsComponent,
    QuizRunComponent,
    QuizSaveComponent,
    IntroComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    NgPipesModule
    
  ],
  providers: [SparqlService,QuizService,QuestionService,DataStorageService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
