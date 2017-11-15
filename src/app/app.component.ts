import { Component, OnInit } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { Quiz } from './models/quiz';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  quizesList:Quiz[];

  constructor(private quizService:QuizService) { }

  ngOnInit() {
    this.quizesList = this.quizService.getQuizesList();

    this.quizService.QuizChange
    .subscribe(
      (quizes: Quiz[]) => {
        this.quizesList = quizes;
               
      }
    );
  }

}


