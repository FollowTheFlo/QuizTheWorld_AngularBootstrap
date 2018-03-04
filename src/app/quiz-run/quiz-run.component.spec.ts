import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRunComponent } from './quiz-run.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import {SparqlService} from '../services/sparql.service';
import {HttpClient, HttpClientModule,HttpHandler} from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ComponentLoaderFactory,PositioningService  } from 'ngx-bootstrap';

describe('QuizRunComponent', () => {
  let component: QuizRunComponent;
  let fixture: ComponentFixture<QuizRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRunComponent ],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient)=>new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }),
      
],
      providers: [QuizService,SparqlService,QuestionService,HttpClient,HttpClientModule,HttpHandler,BsModalService,BsModalRef,ComponentLoaderFactory,PositioningService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
