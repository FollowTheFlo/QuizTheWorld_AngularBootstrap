import { Component, OnInit} from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css'],
})
export class QuizCreateComponent implements OnInit {

  loading:string='';
  sparql_response:string='nothing';
  articleStatus:string="";
  language:string="en";
  checkBoxShowAnswer:boolean=false;
  isCollapsed: boolean = true;
  suggestionsList:string[] = [];
  showSuggestions:boolean = false;
  targetInputValue:string = "";

  constructor(private quizService:QuizService,private translate: TranslateService) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.quizService.getLanguage());
  }

  maxQuestionsValue:number=3;
  maxChoicesValue:number=3;

  collapsed(event: any): void {
    console.log(event);
  }
 
  expanded(event: any): void {
    console.log(event);
  }

  onChangeShowAnswerCheckBox(){

  this.checkBoxShowAnswer = !this.checkBoxShowAnswer;

  this.quizService.setShowAnwserCheckBoxValue(this.checkBoxShowAnswer);
  

    //alert("onChangeShowAnswerCheckBox: "+this.checkBoxShowAnswer);
  }

  capitalizeFirstLetter(articleString:string) {

/*
    return articleString
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
    */
    return articleString.charAt(0).toUpperCase() + articleString.slice(1);
}


  clickCreateQuiz(articleInputString:string,maxQuestionsInput: HTMLInputElement,maxChoicesInput: HTMLInputElement): void {

      //Localisation labels
    let LOADING:string="Loading";
    let SUGGESTION_NOT_FOUND:string="";
    let QUESTIONS_NOT_FOUND:string="";
    let TIMEOUT:string="";
    let EXCEPTION:string="";
    let NOT_FILLED:string="";
    let SUBJECT_NOT_FOUND:string="";
    let FINISHED_LOADING:string="";
    let EXEMPLES:string="";
    let QUIZ_NOT_FOUND:string="";
    let SUGGESTIONS_BELOW:string="";
    this.translate.get(['SUGGESTIONS_BELOW','QUIZ_NOT_FOUND','LOADING','SUGGESTION_NOT_FOUND','QUESTIONS_NOT_FOUND','TIMEOUT','EXCEPTION','NOT_FILLED','SUBJECT_NOT_FOUND','FINISHED_LOADING','EXEMPLES']).subscribe((translationRes: string) => {
    LOADING = translationRes['LOADING'];
    SUGGESTION_NOT_FOUND = translationRes['SUGGESTION_NOT_FOUND'];
    QUESTIONS_NOT_FOUND = translationRes['QUESTIONS_NOT_FOUND'];
    TIMEOUT = translationRes['TIMEOUT'];
    EXCEPTION = translationRes['EXCEPTION'];
    NOT_FILLED = translationRes['NOT_FILLED'];
    SUBJECT_NOT_FOUND = translationRes['SUBJECT_NOT_FOUND'];
    QUIZ_NOT_FOUND = translationRes['QUIZ_NOT_FOUND'];
    FINISHED_LOADING = translationRes['FINISHED_LOADING'];
    EXEMPLES = translationRes['EXEMPLES'];
    SUGGESTIONS_BELOW = translationRes['SUGGESTIONS_BELOW'];
  });

    articleInputString = this.capitalizeFirstLetter(articleInputString);
    this.targetInputValue = articleInputString;
    this.showSuggestions = false;
  this.loading='Loading';
      if(articleInputString && maxQuestionsInput.value && maxChoicesInput.value)
      {
        this.articleStatus=LOADING;
        this.quizService.generateQuiz(articleInputString,+maxQuestionsInput.value,+maxChoicesInput.value,this.language).then(
          response => {
           
            //this.articleStatus =  response;

              console.log('articleStatus: '+this.articleStatus);

              if(response == 'no_target_suggestions')
              {
                this.articleStatus= SUBJECT_NOT_FOUND;
                this.quizService.getSuggestions(articleInputString,this.language).then(
                  response => {
                   // this.suggestionsList = response;

                    if(response.length >0)
                    {
                      this.suggestionsList = response;
                      this.articleStatus=SUGGESTIONS_BELOW;
                      this.showSuggestions = true;
                    }
                    else{

                      this.articleStatus=QUIZ_NOT_FOUND;
                      this.showSuggestions = false;
                      this.targetInputValue="";
                    }

                  },
                  msg=>{  
                    console.log('in Reject: quiz-create');
                    this.articleStatus=msg;
                    this.showSuggestions = false;
                    this.targetInputValue="";
                  });
               
                //this.articleStatus='Not found, see below suggestions:';
              }
              else if(response == 'no_subject_suggestions')
              {
                this.articleStatus= QUESTIONS_NOT_FOUND;
                this.quizService.getSuggestions(articleInputString,this.language).then(
                  response => {
                   // this.suggestionsList = response;

                    if(response.length >0)
                    {
                      this.suggestionsList = response;
                      this.articleStatus=SUGGESTIONS_BELOW;
                      this.showSuggestions = true;
                    }
                    else{

                      this.articleStatus=SUGGESTION_NOT_FOUND;
                      this.showSuggestions = false;
                      this.targetInputValue="";
                    }

                  },
                  reject=>{  
                    this.showSuggestions = false;
                    this.articleStatus=TIMEOUT;});
                    this.targetInputValue="";
              }

              this.articleStatus = FINISHED_LOADING;
            
              //this.loading = 'Finsh loading';
          
          },
          reject=> {this.articleStatus=EXCEPTION;}
          
        );
      }
      else
      {
        alert(NOT_FILLED);
      }
    
  }

  QuestionsInc(): void{
    if(this.maxQuestionsValue < 51)
    +this.maxQuestionsValue ++;
  }
  QuestionsDec(): void{
    if(this.maxQuestionsValue >0)
      +this.maxQuestionsValue --;
  }
  ChoicesInc(): void{
    if(this.maxChoicesValue < 51)
    +this.maxChoicesValue ++;
  }
  ChoicesDec(): void{
    if(this.maxChoicesValue >0)
      +this.maxChoicesValue --;
  }

  onClickClearQuizesList(){

    this.quizService.ClearQuizesList();
  }

  onClickLanguage(language:string){
    this.language = language;
    this.quizService.setLanguage(language);
    this.translate.use(language);

  }

}



