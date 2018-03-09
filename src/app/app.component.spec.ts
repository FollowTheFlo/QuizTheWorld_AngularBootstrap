import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizSaveComponent } from './quiz-save/quiz-save.component';
import { QuizesListComponent } from './quizes-list/quizes-list.component';
import { QuizRunComponent } from './quiz-run/quiz-run.component';
import { IntroComponent } from './intro/intro.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {HttpClient, HttpClientModule,HttpHandler,} from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap';
import { QuizService } from './services/quiz.service';
import {SparqlService} from './services/sparql.service';
import { DataStorageService } from './services/data-storage.service';
import {UserService} from './services/user.service';


describe('AppComponent', () => {

  //let quizService = QuizService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        QuizCreateComponent,
        QuizSaveComponent,
        QuizesListComponent,
        QuizRunComponent,
        IntroComponent,
        QuestionsListComponent,
        CarouselComponent
      ],
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
      CarouselModule.forRoot(),
      BsDropdownModule.forRoot(),
      CollapseModule.forRoot(),
    ],
    providers: [QuizService,SparqlService,HttpClient,HttpClientModule,HttpHandler,DataStorageService,UserService,],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a MainTitle tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.MainTitle').textContent).toContain('Quiz The World');
  }));
});
