import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quizes-list',
  templateUrl: './quizes-list.component.html',
  styleUrls: ['./quizes-list.component.css']
})
export class QuizesListComponent implements OnInit {
  
  quizesList:Quiz[];
  selectedIndex:number = -1
    constructor(private quizService:QuizService) { }
  
    ngOnInit() {
      this.quizesList = this.quizService.getQuizesList();
     // this.quizesList[0].toasts_list[0].subject_OK.article_name
      this.quizService.QuizAdded
        .subscribe(
          (quizes: Quiz[]) => {
            this.quizesList = quizes;
          //  this.quizService.quizSelected.next(this.quizesList[ this.quizesList.length-1]);
          }
        );
    }
  
    onSelect(quiz: Quiz, index): void {
      // this.selectedArticle = article;
      this.selectedIndex = index;
      this.quizService.quizSelected.next(quiz);
       //this.router.navigate(['/articles-list', article.name]);
    }
     }
