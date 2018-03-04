import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsListComponent } from './questions-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import {SparqlService} from '../services/sparql.service';
import {HttpClient, HttpClientModule,HttpHandler} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';

describe('QuestionsListComponent', () => {
  let component: QuestionsListComponent;
  let fixture: ComponentFixture<QuestionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsListComponent ],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient)=>new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }),
      BsDropdownModule.forRoot(),
      AccordionModule.forRoot(),
      ButtonsModule.forRoot(),
      BsDropdownModule.forRoot(),
      CollapseModule.forRoot(),],
      providers: [QuizService,SparqlService,QuestionService,HttpClient,HttpClientModule,HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
