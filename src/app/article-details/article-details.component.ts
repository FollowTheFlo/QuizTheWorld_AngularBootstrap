import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import { Article } from '../models/article';
import { Quiz } from '../models/quiz';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  
  article:Article;
  sanitizedUrl :any;
  
    constructor(private quizService:QuizService,private questionService:QuestionService,private sanitizer:DomSanitizer) { }
  
    ngOnInit() {
      this.quizService.quizSelected.subscribe(
        (selectedQuiz: Quiz) => {
          this.article = null;
        }
      );

      this.questionService.questionSelected.subscribe(
        (selectedArticle: Article) => {
         this.article = selectedArticle;
         this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(selectedArticle.thumbnail_url);
        }
      );
   
     
    }
  
    
     }
