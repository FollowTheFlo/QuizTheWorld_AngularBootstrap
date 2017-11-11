import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Question } from '../models/question';
import { Article } from '../models/article';
import { QuizService } from '../services/quiz.service';
import { QuestionService } from '../services/question.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

quiz:Quiz;

  constructor(private quizService:QuizService, private questionService:QuestionService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.quizService.quizSelected.subscribe(
      (selectedQuiz: Quiz) => {
       this.quiz = selectedQuiz;
      }
    );
   // this.quiz.toasts_list[0].article_shuffle_list
   
  }

  onSelect(article: Article): void {
    // this.selectedArticle = article;
    this.questionService.questionSelected.next(article);
     //this.router.navigate(['/articles-list', article.name]);
  }

  
   }
