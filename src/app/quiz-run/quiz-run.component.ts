import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Question } from '../models/question';
import { Article } from '../models/article';
import { QuizService } from '../services/quiz.service';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  styleUrls: ['./quiz-run.component.css']
})
export class QuizRunComponent implements OnInit {

  quiz:Quiz;
  currentQuestionIndex:number=0;
  totalQuestions:number;
  currentQuestion:Question;
  NextButtonValue:string='Next';
  totalScoreString:string='';

  constructor(private quizService:QuizService, private questionService:QuestionService) { }



  ngOnInit() {
    this.quizService.quizSelected.subscribe(
      (selectedQuiz: Quiz) => {
       this.quiz = selectedQuiz;
       this.totalQuestions = this.quiz.toasts_list.length;
       this.currentQuestion = this.quiz.toasts_list[0];
       this.NextButtonValue='Next';
       this.currentQuestionIndex=0;
      }
    );


   

/*
    this.quizService.QuizAdded
    .subscribe(
      (quizes: Quiz[]) => {
        this.quiz = quizes[quizes.length-1];
        this.totalQuestions = this.quiz.toasts_list.length;
        this.currentQuestion = this.quiz.toasts_list[0];
        this.NextButtonValue='Next';
        this.currentQuestionIndex=0;
        alert('here: ' + (quizes.length-1));
      //  this.quizService.quizSelected.next(this.quizesList[ this.quizesList.length-1]);
      }
    );
    */
  }

  getIndexIfQuizResume():number
  {
  let i:number=0;
  let lastAnsweredQuestion:number=0;

  while(i<this.quiz.toasts_list.length)
  {
    if(this.quiz.toasts_list[i].answered==true)
    {
      lastAnsweredQuestion = i;
    }
    i++;

  }

  return lastAnsweredQuestion;
 
  }

  onClickSelectQuestion(selectedChoiceIndex:number){

   // alert(selectedChoiceIndex);
    this.ClearCurrentQuestionUserSelection();
    this.currentQuestion.article_shuffle_list[selectedChoiceIndex].user_answer=true;
    this.currentQuestion.answered=true;
    this.quiz.is_started=true;
  }

  ClearCurrentQuestionUserSelection()
  {
    let i:number=0;
    while(i<  this.currentQuestion.article_shuffle_list.length){
      this.currentQuestion.article_shuffle_list[i].user_answer=false;
      i++;
    }


  }

  onClickNextQuestion(){

    if(this.currentQuestion.answered==false)
    {
      alert('Please select an asnwer');
      return;
    }

    if(this.currentQuestionIndex == this.quiz.toasts_list.length -2)
    {
      //alert("Last Question");
      this.NextButtonValue = 'Finish';
      this.currentQuestionIndex++;
      this.currentQuestion = this.quiz.toasts_list[this.currentQuestionIndex];
    }
    else if(this.currentQuestionIndex == this.quiz.toasts_list.length-1){
      //means whas click when label is Finshed, we can now close the quiz
      this.quiz.is_finished=true;
     
      this.CalculateTotalScore();
    }
    else{
      this.NextButtonValue = 'Next';
      this.currentQuestionIndex++;
      this.currentQuestion = this.quiz.toasts_list[this.currentQuestionIndex];
    }
    
  }

  onClickPreviousQuestion(){

    if(this.currentQuestionIndex == 0)
    {
      alert("First Question");
    }
    else{
      this.currentQuestionIndex--;
      this.currentQuestion = this.quiz.toasts_list[this.currentQuestionIndex];
    }
   
  }

  CalculateTotalScore()
  {
let i:number=0;

while(i< this.quiz.toasts_list.length)
{
    let j:number=0;
    while(j<  this.quiz.toasts_list[i].article_shuffle_list.length){
      
      if(this.quiz.toasts_list[i].article_shuffle_list[j].user_answer == true && this.quiz.toasts_list[i].article_shuffle_list[j].wiki_correct==true )
      {
        this.quiz.toasts_list[i].answered_ok=true;
      }
      

      j++;
    }
    i++;
  }

  let good_answers:number=0;
  i=0;
  while(i< this.quiz.toasts_list.length)
  {
    if(this.quiz.toasts_list[i].answered_ok==true)
      good_answers++;
    
    i++;
  }

  this.quiz.final_score = +((good_answers/this.quiz.toasts_list.length) * 100).toFixed(0);
  this.totalScoreString = 'Results: '+ this.quiz.final_score + '%(' + good_answers + ' / ' + this.quiz.toasts_list.length +')';
  }



}
