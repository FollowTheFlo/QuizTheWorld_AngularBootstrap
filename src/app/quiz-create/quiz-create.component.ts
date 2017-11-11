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

  clickCreateQuiz(articleInput: HTMLInputElement,maxQuestionsInput: HTMLInputElement,maxChoicesInput: HTMLInputElement): void {



  this.loading='Loading';
      if(articleInput.value && maxQuestionsInput.value && maxChoicesInput.value)
      {
        this.articleStatus='Loading';
        this.quizService.generateQuiz(articleInput.value,+maxQuestionsInput.value,+maxChoicesInput.value,this.language).then(
          response => {
           
            this.articleStatus =  response;

              console.log('articleStatus: '+this.articleStatus);
            
              //this.loading = 'Finsh loading';
          
          }
          
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



