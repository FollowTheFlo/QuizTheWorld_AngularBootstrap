import {Injector} from "@angular/core";
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { QuizCreateComponent } from './quiz-create.component';
import { TranslateModule, TranslateLoader,TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import {SparqlService} from '../services/sparql.service';
import {HttpClient, HttpClientModule,HttpHandler} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import {Observable} from 'rxjs/Observable';


let translations: any = {"LAUNCH_QUIZ": "Launch Quiz","ENTER_SUBJECT":"Enter a Subject",};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}

describe('QuizCreateComponent', () => {
  let component: QuizCreateComponent;
  let fixture: ComponentFixture<QuizCreateComponent>;
  let translate: TranslateService;
  let injector:  Injector;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCreateComponent ],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: FakeLoader
         //provide: TranslateLoader,
        // useFactory: (http: HttpClient)=>new TranslateHttpLoader(http, './assets/i18n/', '.json'),
         //deps: [HttpClient]

        }
      }),
      BsDropdownModule.forRoot(),
      AccordionModule.forRoot(),
      ButtonsModule.forRoot(),
      BsDropdownModule.forRoot(),
      CollapseModule.forRoot(),],
      providers: [QuizService,SparqlService,QuestionService,HttpClient,HttpClientModule,HttpHandler,TranslateService]
    })
    .compileComponents();
  }));
 //translate = injector.get(TranslateService);
  //Rather than duplicate the TestBed configuration for each test, you refactor to pull the setup into a Jasmine beforeEach()
  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuizCreateComponent);
    component = fixture.componentInstance;
    //translate = service;
    
    injector = getTestBed();
    translate = injector.get(TranslateService);
    translate.use('en');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should have button label with Launch Quiz english by default',()=>{
  //fixture.detectChanges();
 // injector = getTestBed();
 // translate = injector.get(TranslateService);
 // translate.use('en');
  //translate.setDefaultLang('en');

  
  fixture.detectChanges();
  const bannerElement: HTMLElement = fixture.nativeElement;
  const btnEl = bannerElement.querySelector('.btn.btn-lg');
  expect(btnEl.textContent).toEqual('Launch Quiz');
});

it('should click QuestionsInc() increment maxQuestionsValue except over 50',()=>{

  component.maxQuestionsValue = 10;
  component.QuestionsInc();
  expect(component.maxQuestionsValue).toEqual(11);

  //does not increment over 50
  component.maxQuestionsValue = 51;
  component.QuestionsInc();
  expect(component.maxQuestionsValue).toEqual(51);
});

it('should click QuestionsDec() decrement maxQuestionsValue except 0',()=>{
  
    component.maxQuestionsValue = 10;
    component.QuestionsDec();
    expect(component.maxQuestionsValue).toEqual(9);
  
    //does not increment over 50
    component.maxQuestionsValue = 0;
    component.QuestionsDec();
    expect(component.maxQuestionsValue).toEqual(0);
  });

it('should capitalizeFirstLetter(\'test\')return \'Test\'',()=>{
  
    expect(component.capitalizeFirstLetter('test')).toEqual('Test');
  });

});
