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
  selectedIndex:number = -1;
  statusString:string = "START QUIZ";
    constructor(private quizService:QuizService) { }
  
    ngOnInit() {
      this.quizesList = this.quizService.getQuizesList();
     // this.quizesList[0].toasts_list[0].subject_OK.article_name
      this.quizService.QuizChange
        .subscribe(
          (quizes: Quiz[]) => {
            this.quizesList = quizes;
            if(this.quizesList[0]){
              this.clearQuizSelection();
              this.quizesList[0].is_selected =  true;
              this.selectedIndex = 0;
              this.quizService.quizSelected.next(this.quizesList[0]);
             
              
            }
            
          }
        );
    }
  
    onSelect(quiz: Quiz, index): void {
      // this.selectedArticle = article;
      this.clearQuizSelection();
      this.selectedIndex = index;
      this.quizesList[this.selectedIndex].is_selected =  true;
      this.quizService.quizSelected.next(quiz);
      
       //this.router.navigate(['/articles-list', article.name]);
    }

    setStatusString(){



      /*
      <div *ngIf= !quiz.is_finished> 
      <div *ngIf= !quiz.is_started><br>START QUIZ</div>
      <div *ngIf= quiz.is_started><br>RESUME QUIZ</div>
      </div>
    <div *ngIf= quiz.is_finished> <br>QUIZ FINISHED</div>

    if()
*/
    }

    clearQuizSelection()
    {
      let i:number=0;
      while(i<this.quizesList.length)
      {
        this.quizesList[i].is_selected = false;
        i++;
      }

    }

     }
