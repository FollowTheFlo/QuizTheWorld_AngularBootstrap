import { Component, OnInit} from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css'],
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
  targetInputValue:string = "Montreal"; //display by default in 'Enter Subject' text box
  optionsList:string[]=['6','4','false','20','10'];
  showAnswerAfterQuestion:boolean=false;
  maxQuestionsValue:number=3;
  maxChoicesValue:number=3;

  constructor(private quizService:QuizService,private translate: TranslateService) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.quizService.getLanguage());

    this.quizService.carouselSelected.subscribe(
      suggestion => {
        if(suggestion)
        {
         
          this.clickCreateQuiz(suggestion,true);
         
        }
        else{
          console.log("Suggestion string is null");
        }
      
    }
    );
  }




  getOptionsList(){
    
        //index 0 -> maxQuestionsValue
        //index 1 -> maxChoicesValue
        //index 2 -> showAnswerAfterQuestion
        this.optionsList =this.quizService.getOptionsList();
    
        this.maxQuestionsValue = +this.optionsList[0];
        this.maxChoicesValue = +this.optionsList[1];
    
        if(this.optionsList[1]==='true')
          this.showAnswerAfterQuestion = true;
        else
        this.showAnswerAfterQuestion = false;
    
        this.language = this.quizService.getLanguage();
    
      }

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
/*
clickCreateQuiz(articleInputString:string,startedFromSuggestion):void {
  //clickCreateQuiz(articleInputString:string,maxQuestionsInput: HTMLInputElement,maxChoicesInput: HTMLInputElement): void {

      //Localisation labels
    let LOADING:string="Loading";
    let SUGGESTION_NOT_FOUND:string="";
    let QUESTIONS_NOT_FOUND:string="";
    let TIMEOUT:string="";
    let EXCEPTION:string="";
    let NOT_FILLED:string="";
    let SUBJECT_NOT_FOUND:string="";
    let FINISHED_LOADING:string="";
    let EXEMPLES:string="";
    let QUIZ_NOT_FOUND:string="";
    let SUGGESTIONS_BELOW:string="";
    this.translate.get(['SUGGESTIONS_BELOW','QUIZ_NOT_FOUND','LOADING','SUGGESTION_NOT_FOUND','QUESTIONS_NOT_FOUND','TIMEOUT','EXCEPTION','NOT_FILLED','SUBJECT_NOT_FOUND','FINISHED_LOADING','EXEMPLES']).subscribe((translationRes: string) => {
    LOADING = translationRes['LOADING'];
    SUGGESTION_NOT_FOUND = translationRes['SUGGESTION_NOT_FOUND'];
    QUESTIONS_NOT_FOUND = translationRes['QUESTIONS_NOT_FOUND'];
    TIMEOUT = translationRes['TIMEOUT'];
    EXCEPTION = translationRes['EXCEPTION'];
    NOT_FILLED = translationRes['NOT_FILLED'];
    SUBJECT_NOT_FOUND = translationRes['SUBJECT_NOT_FOUND'];
    QUIZ_NOT_FOUND = translationRes['QUIZ_NOT_FOUND'];
    FINISHED_LOADING = translationRes['FINISHED_LOADING'];
    EXEMPLES = translationRes['EXEMPLES'];
    SUGGESTIONS_BELOW = translationRes['SUGGESTIONS_BELOW'];
  });

    articleInputString = this.capitalizeFirstLetter(articleInputString);
    this.targetInputValue = articleInputString;
    this.showSuggestions = false;
  this.loading='Loading';
      if(articleInputString && this.maxQuestionsValue && this.maxChoicesValue)
      {
        this.articleStatus=LOADING;
        this.quizService.generateQuiz(articleInputString,+this.maxQuestionsValue,+this.maxChoicesValue,this.language).then(
          response => {
           
            //this.articleStatus =  response;

              console.log('articleStatus: '+this.articleStatus);

              if(response == 'no_target_suggestions')
              {
                this.articleStatus= SUBJECT_NOT_FOUND;
                this.quizService.getSuggestions(articleInputString,this.language).then(
                  response => {
                   // this.suggestionsList = response;

                    if(response.length >0)
                    {
                      this.suggestionsList = response;
                      this.articleStatus=SUGGESTIONS_BELOW;
                      this.showSuggestions = true;
                    }
                    else{

                      this.articleStatus=QUIZ_NOT_FOUND;
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
                this.articleStatus= QUESTIONS_NOT_FOUND;
                this.quizService.getSuggestions(articleInputString,this.language).then(
                  response => {
                   // this.suggestionsList = response;

                    if(response.length >0)
                    {
                      this.suggestionsList = response;
                      this.articleStatus=SUGGESTIONS_BELOW;
                      this.showSuggestions = true;
                    }
                    else{

                      this.articleStatus=SUGGESTION_NOT_FOUND;
                      this.showSuggestions = false;
                      this.targetInputValue="";
                    }

                  },
                  reject=>{  
                    this.showSuggestions = false;
                    this.articleStatus=TIMEOUT;});
                    this.targetInputValue="";
              }

              this.articleStatus = FINISHED_LOADING;
            
              //this.loading = 'Finsh loading';
          
          },
          reject=> {this.articleStatus=EXCEPTION;}
          
        );
      }
      else
      {
        alert(NOT_FILLED);
      }
    
  }
*/

/////////////////
clickCreateQuiz(articleInputString:string,startedFromSuggestion): void {
  this.showSuggestions = false;
  console.log("Enter startedFromSuggestion "+startedFromSuggestion);
//Localisation labels
let LOADING:string="Loading";
let SUGGESTION_NOT_FOUND:string="";
let QUESTIONS_NOT_FOUND:string="";
let TIMEOUT:string="";
let EXCEPTION:string="";
let NOT_FILLED:string="";
let SUBJECT_NOT_FOUND:string="";
let FINISHED_LOADING:string="";
let EXEMPLES:string="";
let QUIZ_NOT_FOUND:string="";

  this.translate.get(['QUIZ_NOT_FOUND','LOADING','SUGGESTION_NOT_FOUND','QUESTIONS_NOT_FOUND','TIMEOUT','EXCEPTION','NOT_FILLED','SUBJECT_NOT_FOUND','FINISHED_LOADING','EXEMPLES']).subscribe((translationRes: string) => {
    
     LOADING = translationRes['LOADING'];
     SUGGESTION_NOT_FOUND = translationRes['SUGGESTION_NOT_FOUND'];
     QUESTIONS_NOT_FOUND = translationRes['QUESTIONS_NOT_FOUND'];
     TIMEOUT = translationRes['TIMEOUT'];
     EXCEPTION = translationRes['EXCEPTION'];
     NOT_FILLED = translationRes['NOT_FILLED'];
     SUBJECT_NOT_FOUND = translationRes['SUBJECT_NOT_FOUND'];
     QUIZ_NOT_FOUND = translationRes['QUIZ_NOT_FOUND'];
     FINISHED_LOADING = translationRes['FINISHED_LOADING'];
     EXEMPLES = translationRes['EXEMPLES'];
 
    
 });

   //Loader message
   


    
      articleInputString = this.capitalizeFirstLetter(articleInputString);
      this.targetInputValue = articleInputString;
     
    this.loading= LOADING;
        if(articleInputString && this.maxQuestionsValue && this.maxChoicesValue)
        {
          
         
          this.articleStatus= LOADING;

          //loader.present();
         
          this.getOptionsList();
          this.quizService.generateQuiz(articleInputString,this.maxQuestionsValue,this.maxChoicesValue,this.language).then(
            response => {
              
              this.articleStatus =  response;
  
                console.log('articleStatus: '+this.articleStatus);
  
                if(response == 'Finished Loading')
                {
                  console.log('response == Finished Loading');
                  this.articleStatus= FINISHED_LOADING;

                 let quiz:Quiz = this.quizService.getLastQuiz();
                 console.log('quiz: '+quiz.target_name);
                // //loader.dismiss().catch(() => {console.log('catch loader dismiss');});
                 // //this.navCtrl.push(QuizRunPage,{quiz});

                  //no need to display Success as we go straight on Quiz Run
                  this.targetInputValue=""; //clear input
                  this.articleStatus ="";

                }
                else if(response == 'no_target_suggestions')
                {
                  this.articleStatus= "Subject not found. Loading Suggestions";

                 // //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
                  
                  ///////////////////////requestSuggestions START//////////////////                    
                  this.articleStatus=QUESTIONS_NOT_FOUND;
                  //loader.present();
                  console.log("Enter requestSuggestions")
                  this.quizService.getSuggestions(articleInputString,this.language).then(
                    response => {
                    // this.suggestionsList = response;
                  //  //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
                      if(response.length >0)
                      {
                        this.suggestionsList = response;
                        this.articleStatus="No Subject found. See subjects suggestions";
                        console.log(this.articleStatus);
                    
                      
                        
                        let suggestionsList:string[] = this.suggestionsList;
                        this.showSuggestions = true;
                       // //this.navCtrl.push(SuggestionsPage,{suggestionsList,articleInputString});
                      
                      }
                      else{
                        this.showSuggestions = false;
                        this.articleStatus="no Suggestions not found";
                        console.log(this.articleStatus);
                      
                        this.targetInputValue="";
                      
                        this.articleStatus=SUGGESTION_NOT_FOUND;
                      }

                    },
                    reject=>{  
                      this.showSuggestions = false;
                      console.log('in Reject: quiz-create');
                     // //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
                      
                      
                    
                      this.targetInputValue="";
                      console.log('reject: '+this.articleStatus);
                  

                        console.log("Loading Type Questions");
                        
                        //---------------------------//if no suggestion, try the Type questions
                        this.requestTypeQuestions(articleInputString);


                      

                    });

                  ///////////////////////requestSuggestions END//////////////////                   
                 
                  //this.articleStatus='Not found, see below suggestions:';
                }
                else if(response == 'no_subject_suggestions')
                {
                  console.log("condition: no_subject_suggestions ");
                  this.articleStatus= "No questions found for this subject. Loading Suggestions";
                  console.log( this.articleStatus);
                 // //loader.dismiss().catch(() => { console.log('catch loader dismiss');});


                  
                  //if thge article already from suggestion we go straight to Type Questions, we don't run suggestions again
                  if(!startedFromSuggestion)
                  {
                    //fresh subject, not from suggestion attempt
///////////////////////requestSuggestions START//////////////////
this.articleStatus=QUESTIONS_NOT_FOUND;
//loader.present();
console.log("Enter requestSuggestions")
this.quizService.getSuggestions(articleInputString,this.language).then(
response => {
 // this.suggestionsList = response;
 ////loader.dismiss().catch(() => { console.log('catch loader dismiss');});
  if(response.length >0)
  {
    this.suggestionsList = response;
    this.articleStatus="subjects suggestions found";
    this.showSuggestions = true;
    console.log(this.articleStatus);
 
  
    
    let suggestionsList:string[] = this.suggestionsList;
   // //this.navCtrl.push(SuggestionsPage,{suggestionsList,articleInputString});
   
  }
  else{

    this.articleStatus="no Suggestions found";
    console.log(this.articleStatus);
    this.showSuggestions = false;
    this.targetInputValue="";
   
    this.articleStatus= SUGGESTION_NOT_FOUND;
  }

},
reject=>{  
  this.showSuggestions = false;
  console.log('in Reject: quiz-create');
 // //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
  
  
 
  this.targetInputValue="";
  console.log('reject: '+this.articleStatus);


    console.log("Loading Type Questions");
    
    //---------------------------//if no suggestion, try the Type questions
                        //////////////////////requestTypeQuestions START///////////////
                  this.articleStatus= LOADING;
                  this.quizService.generateTypeQuiz(articleInputString,this.maxQuestionsValue,this.maxChoicesValue,this.language).then(
                    response => {

                      if(response == 'Finished Loading')
                      {
                        console.log('response == Finished Loading');
                        this.articleStatus= FINISHED_LOADING;

                      let quiz:Quiz = this.quizService.getLastQuiz();
                      console.log('quiz: '+quiz.target_name);
                      //loader.dismiss().catch(() => {console.log('catch loader dismiss');});
                        //this.navCtrl.push(QuizRunPage,{quiz});

                        //no need to display Success as we go straight on Quiz Run
                        this.targetInputValue=""; //clear input
                        this.articleStatus ="";
                      }
                      else{
                        console.log('in Reject: quiz-create:generateTypeQuiz');
                        //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
                      this.targetInputValue="";
                      
                          this.articleStatus= SUGGESTION_NOT_FOUND;

                      }
                    },
                    reject=>{

                      console.log('in Reject2: quiz-create');
                      //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
                    this.targetInputValue="";
                      console.log('reject: '+this.articleStatus);
                  
                        this.articleStatus= SUGGESTION_NOT_FOUND;

                    });
                  //////////////////////requestTypeQuestions END///////////////


   

});

///////////////////////requestSuggestions END///////////////////
                }
                else{
                  
//---------------------------//we are running an unseccessful suggestion, so try Type questions

//////////////////////requestTypeQuestions START///////////////
this.articleStatus= LOADING;
this.quizService.generateTypeQuiz(articleInputString,this.maxQuestionsValue,this.maxChoicesValue,this.language).then(
response => {

  if(response == 'Finished Loading')
  {
    console.log('response == Finished Loading');
    this.articleStatus= FINISHED_LOADING;

   let quiz:Quiz = this.quizService.getLastQuiz();
   console.log('quiz: '+quiz.target_name);
   //loader.dismiss().catch(() => {console.log('catch loader dismiss');});
    //this.navCtrl.push(QuizRunPage,{quiz});

    //no need to display Success as we go straight on Quiz Run
    this.targetInputValue=""; //clear input
    this.articleStatus ="";
   }
   else{
    console.log('in Reject: quiz-create:generateTypeQuiz');
    //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
   this.targetInputValue="";
   
      this.articleStatus= QUIZ_NOT_FOUND;

   }
},
reject=>{

  console.log('in Reject2: quiz-create');
  //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
 this.targetInputValue="";
  console.log('reject: '+this.articleStatus);

    this.articleStatus= QUIZ_NOT_FOUND;

});
//////////////////////requestTypeQuestions END///////////////


                   }
                     
                }
              
                //this.loading = 'Finsh loading';
            
            },
            reject=> {this.articleStatus="Error, check your network connection";
            //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
            this.articleStatus= EXCEPTION;
          }
            
          );
        }
        else
        {
          console.log('Please fill all fields');
          this.articleStatus=NOT_FILLED;
        }
      
    }



requestTypeQuestions(articleInputString:string){



this.articleStatus="Loading";
this.quizService.generateTypeQuiz(articleInputString,this.maxQuestionsValue,this.maxChoicesValue,this.language).then(
  response => {

    if(response == 'Finished Loading')
    {
      console.log('response == Finished Loading');
      this.articleStatus="Finished loading";

     let quiz:Quiz = this.quizService.getLastQuiz();
     console.log('quiz: '+quiz.target_name);
     //loader.dismiss().catch(() => {console.log('catch loader dismiss');});
      //this.navCtrl.push(QuizRunPage,{quiz});

      //no need to display Success as we go straight on Quiz Run
      this.targetInputValue=""; //clear input
      this.articleStatus ="";
     }
     else{
      console.log('in Reject: quiz-create:generateTypeQuiz');
      //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
     this.targetInputValue="";
     
        this.articleStatus= "No Questions found";

     }
  },
  reject=>{

    console.log('in Reject2: quiz-create');
    //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
   this.targetInputValue="";
    console.log('reject: '+this.articleStatus);
 
      this.articleStatus= "No Questions found";

  });

}

requestSuggestions(articleInputString:string){


this.articleStatus="No questions found";
//loader.present();
console.log("Enter requestSuggestions")
this.quizService.getSuggestions(articleInputString,this.language).then(
  response => {
   // this.suggestionsList = response;
   //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
    if(response.length >0)
    {
      this.suggestionsList = response;
      this.articleStatus="No Subject found. See subjects suggestions";
      console.log(this.articleStatus);
   
    
      
      let suggestionsList:string[] = this.suggestionsList;
      //this.navCtrl.push(SuggestionsPage,{suggestionsList,articleInputString});
     
    }
    else{

      this.articleStatus="no Suggestions found";
      console.log(this.articleStatus);
     
      this.targetInputValue="";
     
      this.articleStatus= "No suggestions found";
    }

  },
  reject=>{  

    console.log('in Reject: quiz-create');
    //loader.dismiss().catch(() => { console.log('catch loader dismiss');});
    
    
   
    this.targetInputValue="";
    console.log('reject: '+this.articleStatus);
 

      console.log("Loading Type Questions");
      
      //---------------------------//if no suggestion, try the Type questions
      this.requestTypeQuestions(articleInputString);


     

  });


}





/////////////////


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
    this.quizService.setLanguage(language);
    this.translate.use(language);

  }

}



