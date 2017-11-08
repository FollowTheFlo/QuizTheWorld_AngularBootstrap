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
  articleValid:boolean=false;

  constructor(private quizService:QuizService) { }

  ngOnInit() {
  }

  maxQuestionsValue:number=3;
  maxChoicesValue:number=2;
  clickCreateQuiz(articleInput: HTMLInputElement,maxQuestionsInput: HTMLInputElement,maxChoicesInput: HTMLInputElement): void {



  this.loading='Loading';
      if(articleInput.value && maxQuestionsInput.value && maxChoicesInput.value)
      {
        this.loading='Loading';
        this.quizService.generateQuiz(articleInput.value,+maxQuestionsInput.value,+maxChoicesInput.value).then(
          response => {
           
            this.articleValid =  response;

              console.log('isArticleValid: '+this.articleValid);
            
              this.loading = 'Finsh loading';
          
          }
          
        );
      }
      else
      {
        console.log('keyworls empty');
      }
    
  }

  QuestionsInc(): void{
    +this.maxQuestionsValue ++;
  }
  QuestionsDec(): void{
    if(this.maxQuestionsValue >0)
      +this.maxQuestionsValue --;
  }
  ChoicesInc(): void{
    +this.maxChoicesValue ++;
  }
  ChoicesDec(): void{
    if(this.maxChoicesValue >0)
      +this.maxChoicesValue --;
  }


}



