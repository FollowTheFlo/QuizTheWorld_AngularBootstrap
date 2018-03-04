import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSaveComponent } from './quiz-save.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataStorageService } from '../services/data-storage.service';
import { QuizService } from '../services/quiz.service';
import {SparqlService} from '../services/sparql.service';
import {UserService} from '../services/user.service';
import {HttpClient, HttpClientModule,HttpHandler} from '@angular/common/http';


describe('QuizSaveComponent', () => {
  let component: QuizSaveComponent;
  let fixture: ComponentFixture<QuizSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSaveComponent ],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient)=>new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      })],
      providers: [HttpClient,HttpClientModule,HttpHandler,DataStorageService,QuizService,SparqlService,UserService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
