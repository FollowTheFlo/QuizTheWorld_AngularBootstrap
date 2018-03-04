import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import {SparqlService} from '../services/sparql.service';
import { Article } from '../models/article';
import { Quiz } from '../models/quiz';
import {HttpClient, HttpClientModule,HttpHandler,} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { ArticleDetailsComponent } from './article-details.component';



describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsComponent ],
      providers: [QuizService,SparqlService,QuestionService,HttpClient,HttpClientModule,HttpHandler],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
