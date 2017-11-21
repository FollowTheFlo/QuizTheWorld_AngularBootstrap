import { Component, OnInit} from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
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

  constructor(private quizService:QuizService) { }

  ngOnInit() {
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

    articleInputString = this.capitalizeFirstLetter(articleInputString);
    this.targetInputValue = articleInputString;
    this.showSuggestions = false;
  this.loading='Loading';
      if(articleInputString && maxQuestionsInput.value && maxChoicesInput.value)
      {
        this.articleStatus='Loading';
        this.quizService.generateQuiz(articleInputString,+maxQuestionsInput.value,+maxChoicesInput.value,this.language).then(
          response => {
           
            this.articleStatus =  response;

              console.log('articleStatus: '+this.articleStatus);

              if(response == 'no_target_suggestions')
              {
                this.articleStatus= "Subject not found, Loading Suggestions";
                this.quizService.getSuggestions(articleInputString,this.language).then(
                  response => {
                   // this.suggestionsList = response;

                    if(response.length >0)
                    {
                      this.suggestionsList = response;
                      this.articleStatus="No Subject found. See below subjects suggestions";
                      this.showSuggestions = true;
                    }
                    else{

                      this.articleStatus="no Suggestions found";
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
                this.articleStatus= "No questions found for this subject. Loading Suggestions";
                this.quizService.getSuggestions(articleInputString,this.language).then(
                  response => {
                   // this.suggestionsList = response;

                    if(response.length >0)
                    {
                      this.suggestionsList = response;
                      this.articleStatus="No questions found for this subject. See below subjects suggestions";
                      this.showSuggestions = true;
                    }
                    else{

                      this.articleStatus="no Suggestions found";
                      this.showSuggestions = false;
                      this.targetInputValue="";
                    }

                  },
                  reject=>{  
                    this.showSuggestions = false;
                    this.articleStatus="Timeout, please Try a different subject";});
                    this.targetInputValue="";
              }
            
              //this.loading = 'Finsh loading';
          
          },
          reject=> {this.articleStatus="Error, check your network connection";}
          
        );
      }
      else
      {
        console.log('Please fill all fields');
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

  }

}



