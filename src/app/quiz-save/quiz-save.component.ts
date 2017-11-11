import { Component, OnInit } from '@angular/core';

import { Response } from '@angular/http';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-quiz-save',
  templateUrl: './quiz-save.component.html',
  styleUrls: ['./quiz-save.component.css']
})
export class QuizSaveComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit() {
  }


  onClickSaveQuizList(usernameInput: HTMLInputElement) {
   
    if(!usernameInput.value){
      alert("Please enter username");
      return;
    }

    this.dataStorageService.storeQuizesList(usernameInput.value)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }


  onClickRetrieveQuizList(usernameInput: HTMLInputElement){

    if(!usernameInput.value){
      alert("Please enter username");
      return;
    }
      

console.log("onClickRetrieveQuizList");
    this.dataStorageService.getDBQuizesList(usernameInput.value);
  }
}
