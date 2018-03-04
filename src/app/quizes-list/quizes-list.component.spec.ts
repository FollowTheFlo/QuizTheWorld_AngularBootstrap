import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizesListComponent } from './quizes-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataStorageService } from '../services/data-storage.service';
import { QuizService } from '../services/quiz.service';
import {SparqlService} from '../services/sparql.service';
import {UserService} from '../services/user.service';
import {HttpClient, HttpClientModule,HttpHandler} from '@angular/common/http';

describe('QuizesListComponent', () => {
  let component: QuizesListComponent;
  let fixture: ComponentFixture<QuizesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizesListComponent ],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient)=>new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }),
    
    ],
    providers: [QuizService,SparqlService,HttpClient,HttpClientModule,HttpHandler,DataStorageService,UserService,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
