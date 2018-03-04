import {SparqlService} from './sparql.service';
import { Injectable, EventEmitter } from '@angular/core';
import  { Question } from "../models/question";
import { Quiz } from '../models/quiz';
//import { Question } from '../models/question';
//import { QUIZES_LIST } from '../mocks/mock-quizes-list';
//import { Headers, Http, Response,  } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
//import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Article } from '../models/article';




@Injectable()
export class QuizService {
    QUIZES_ALL:Quiz[]=[];
  //  QUESTIONS_ALL:Question[];
QUIZES_ALL_INDEX:number=0;
    index_selection_list:number[];
    results: string[];
    target_subjects_count:number;
    QuizChange = new EventEmitter<Quiz[]>();
    quizSelected = new Subject();
    showAnswerCheckBox:boolean=false;
    suggestionsList:string[] = [];
    language:string = 'en';
   // ARTICLE_SUCCESS:number=0;
   // ARTICLE_NOT_FOUND:number=1;
   // NO_SUBJECT_FOUND:number=2

    constructor(private sparqlService:SparqlService) {}

    getLanguage():string{
        
                return this.language
            }
        
            setLanguage(language:string){
        
                this.language = language;
                
            }

    getShowAnwserCheckBoxValue(){

        return this.showAnswerCheckBox;
    }

    setShowAnwserCheckBoxValue(showAnswerCheckBox:boolean){
        
        this.showAnswerCheckBox = showAnswerCheckBox;
    }

ClearQuizesList(){
    this.QUIZES_ALL = [];
    this.QuizChange.emit(this.QUIZES_ALL);
    }
/*
RemoveEmptyQuizesFromList(){
    let i:number=0
    while(i<this.QUIZES_ALL.length){
        if
    }
    this.QUIZES_ALL = [];
    this.QuizChange.emit(this.QUIZES_ALL);
    }
*/

    

  generateQuiz(article:string,maxQuestions:number,maxChoices:number,language:string):Promise<string>
  {



    let promise =
    new Promise<string>((resolve, reject) => {
       
          this.sparqlService.getArticleCount(article,language).then(
              
            response => {
                //response is the number of article returns from keyword, basically if the article exists, it is over 0
                if(response>0)
                {
                         ///////////////////
                  this.sparqlService.getArticleSubjectCount(article,language).then(
                    response => {
                    //response is number of subject that target article contains
                    if(response>0)
                    {
                   
    
                    this.target_subjects_count= response;
            
                        console.log('inside this.target_subjects_count: '+this.target_subjects_count);
                        
                        //setting randm index table of number, ex: 8,3,7 with max number of elements limit by subject count
                        //this step is use to make the questions in random order
                        this.index_selection_list = this.get_random_list_indexes(maxQuestions,this.target_subjects_count);

                        console.log('index_selection_list: '+this.index_selection_list);

                        //setting vars
                        let question_index:number=0; //to scroll questions
                        let distractor_count:number=0; //to check the number of Distractor of a Subject
                        let random_distractor_index:number=0; // to unforce randomness we will pick a random distractor article within distractor count

                        // we can create a the new quiz has we know we have at least one question (= one subject)
                        //(quiz_id:number,target_name:string,multiple_choices_number:number,max_questions_number:number)
                        let quiz = new Quiz(this.QUIZES_ALL_INDEX,article,maxChoices, this.index_selection_list.length,language);

                        
                            console.log('AtLeastOneValidQuestion, QUIZES_ALL_INDEX: '+this.QUIZES_ALL_INDEX);
                            this.QUIZES_ALL.unshift(quiz);
                            this.QUIZES_ALL_INDEX++;
                        
                        
                        let AtLeastOneValidQuestion:boolean = false;
                       // (quiz_id:number,target_name:string,multiple_choices_number:number,max_questions_number:number)
                        while(question_index <  this.index_selection_list.length)
                        {
                            console.log('0: this.index_selection_list[question_index]: '+this.index_selection_list[question_index]);
                            let selectionListIndex:number = this.index_selection_list[question_index];
                            this.sparqlService.getSubjectDistractorsCount(this.index_selection_list[question_index],article,language).then(
                                response => { 
                                    console.log('getSubjectDistractorsCount: '+response);
                                    console.log('1: this.index_selection_list[question_index]test: '+selectionListIndex);
                                    distractor_count = response;
                                    if(distractor_count==0)
                                    {
                                        //add empty question, we will filter them later
                                        let question = new Question();
                                        quiz.toasts_list.push(question);

                                    }else{
                                      random_distractor_index= this.random_num_out_of(distractor_count-1);
                                      console.log('random_distractor_index: '+random_distractor_index);
                                        
                                      let question = new Question();
                                      console.log('new Question created');

                                      if(question)
                                        console.log("Question not null");
                                      else
                                         console.log("Question NULL!!!");
                                      //getOneQuestionWithArticles(question:Question,target_name:string,target_subject_index:number,distractor_index:number,distractor_subject_index:number,distractor_subject_number:number,SELECTED_LOCALE:string):Promise<boolean>{
         
                                      this.sparqlService.getOneQuestionWithArticles(question,article,selectionListIndex,random_distractor_index,0,maxChoices,language).then(
                                        response => { 
                                            //return is_valid
                                            console.log('getOneQuestionWithArticles: '+response);

                                                AtLeastOneValidQuestion = true;
                                               

                                               this.build_choices_list(question);
                                               
                                               console.log('Question added to toasts_list');
                                                quiz.toasts_list.push(question);
                                       
                                                    if( quiz.toasts_list.length==quiz.max_questions_number)
                                                       {
                                                       //END of the Quiz Creation

                                                        if(quiz.toasts_list.length==0){

                                                            resolve("no_subject_suggestions");
                                                        }else{
                                                            if(!this.removeEmptyQuestionsFromQuiz(quiz))
                                                            {
                                                             
                                                                this.QUIZES_ALL.shift();
                                                                this.QUIZES_ALL_INDEX--;
                                                                resolve("no_subject_suggestions");
                                                            }else
                                                            {
                                                                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: IN CONDITION: "+quiz.toasts_list.length);
                                                                
                                                                let imageSuccess = this.buildImageQuestion(quiz);
                                                                console.log("END IMAGE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: "+imageSuccess);
    
                                                            
                                                                this.QuizChange.emit(this.QUIZES_ALL);
                                                                resolve("Finished Loading");

                                                            }


                                                          
                                                        }
                                                       }
                                                      

                                        }

                                        );

                                    /////////////////////////////


    
                                    /////////////////////////////


                                    }

                                     


                                });
                                
                                question_index++;
                               

                        }

                       
                        //add quiz to list if having at least one valid question

                        
                       
                       
    
    
                    }else{
                       // this.sparqlService.getpopup(' 0 so quit at getArticleSubjectCount' );
                      // resolve("No Questions Found for this subject");

                      resolve("no_subject_suggestions");
                    }
                    
                    }
                    );
        
                    //////////////////////

                    }
                    else{
                        
                        
                       
                                resolve("no_target_suggestions");
                             
                       // alert('0 so quit at getArticleCount')
                    }

               
        }
        );
          //-----

          //this.QuizAdded.emit(this.QUIZES_ALL);
        
          })
          

         

    return promise;
    
  }

  removeEmptyQuestionsFromQuiz(quiz:Quiz):boolean
  {
    let i:number=0;
    let temp_questions_list:Question[]=[];
    //temp_questions_list = quiz.toasts_list

    while(i<quiz.toasts_list.length){

        if(quiz.toasts_list[i].is_valid==true){
            temp_questions_list.push(quiz.toasts_list[i]);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: IN CONDITION: quiz.toasts_list[i].is_valid: "+i);

        }
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: OUT of CONDITION: quiz.toasts_list[i].is_valid: "+i+", "+quiz.toasts_list[i].is_valid);
        
        i++;
    }
    quiz.toasts_list = temp_questions_list;
    console.log("END AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: IN CONDITION  temp_questions_list: "+ temp_questions_list.length);
    console.log("END AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: IN CONDITION  quiz.toasts_list: "+ quiz.toasts_list);
    console.log("END AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdd: IN CONDITION  temp_questions_list: "+ temp_questions_list.length);

    if(temp_questions_list.length == 0)
        return false;
     else
      return true;


  }

   get_random_list_indexes(index_number, total_number):number[]{
    let random_list:number[]=[];
    let random_index:number =0;
    let i:number =0;
    
    if(index_number>=total_number)
    {
        index_number=total_number;
    }
    //alert("index num : "+index_number)
    while(i<index_number)
    {
        random_index = this.random_num_out_of(total_number);
      console.log('random_index: '+random_index);
        if(random_list.indexOf(random_index) == -1)
        {
            console.log('in condition: '+random_index);
            random_list.push(random_index);
            i++;
        }
    }
    
    return random_list;
    
}

random_num_out_of(total_index:number)
{
    
    return Math.floor(Math.random()*(total_index));
}


build_choices_list(choices:Question)
{
     
    //generate random number between 0 and length of KO choicess, will be use to insert OK choices. 
    //create offset as OK choices will be inserted
    let random_index:number = Math.floor(Math.random()*(choices.subject_KO.length+1));
    
    console.log("build_choices_list, random index: "+random_index);

    let article_index:number=0;
    while(article_index < random_index)
    {
        //Choice(choices_index,article,wiki_correct)
        
        choices.article_shuffle_list[article_index]= choices.subject_KO[article_index];
        
        article_index++;
    }
    
            
    //insert good choices
    choices.article_shuffle_list[article_index]= choices.subject_OK;
    article_index++;//increment the index to insert KO choicess after OK choices
    
    //add 1 to length as we added OK choices
    while(article_index < (choices.subject_KO.length+1))
    {
        //Choice(choices_index,article,wiki_correct)
        
        //article_index-1 to pull the subject KO as there was an offset created by OK subject insert
        choices.article_shuffle_list[article_index]= choices.subject_KO[article_index-1];
        console.log("FLO Index QA -> " + article_index);
        
        
        article_index++;
        
        
    }
    
    
    console.log("FLO subject KO length" + choices.subject_KO.length);
    console.log("FLO article_shuffle_list Length -> "+ choices.article_shuffle_list.length);
    
}


getQuizesList():Quiz[]
{

    return this.QUIZES_ALL;
}


buildImageQuestion(quiz)
{
    let distractor_article_list:Article[]=[];
    let i:number=0;
    var j=0;
    
    var target_article;
    
    //we get the target article in index 0, could be any index as target_index always have the the same value
    // sometimes SPARQL returns thumbnail 'undefined', need to filter them
    if( quiz.toasts_list[0] && quiz.toasts_list[0].target_article && quiz.toasts_list[0].target_article.thumbnail_url != "" && quiz.toasts_list[0].target_article.thumbnail_url != "undefined")
         target_article = quiz.toasts_list[0].target_article;
    else 
        return false;

    
    
    //max_questions_number-1 as exclude OK choice
    while((i< quiz.toasts_list.length) && (i<(quiz.multiple_choices_number-1)))
    {
            if(quiz.toasts_list[i] && quiz.toasts_list[i].distractor_article && quiz.toasts_list[i].distractor_article.thumbnail_url != "" && quiz.toasts_list[i].distractor_article.thumbnail_url != "undefined")
            {
                
                    distractor_article_list[j] = quiz.toasts_list[i].distractor_article;
                    j++;
            }
                
            i++;
            
    }
    
    if(distractor_article_list.length == 0)
        return false;
    
        
    let imageQuestion:Question = new Question();
    imageQuestion.imageQuestion=true;

    imageQuestion.subject_OK = target_article;
    imageQuestion.subject_KO = distractor_article_list;
    this.build_choices_list(imageQuestion);
   // insert the Image question in a random index of question list
    quiz.toasts_list.splice(this.random_num_out_of(quiz.toasts_list.length),1,imageQuestion);
    
    return true;
    
}


setQuizList(newQuizList:Quiz[])
{
    this.QUIZES_ALL = newQuizList;
    this.QuizChange.emit(this.QUIZES_ALL);

}

getQuizesListCopy(){

    return this.QUIZES_ALL.slice();

}

getSuggestions(article:string,language:string):Promise<string[]>
{



  let promise =
  new Promise<string[]>((resolve, reject) => {
     
    this.sparqlService.getTargetSuggestions(article,language).then(
        
      response => {
          //response is the number of article returns from keyword, basically if the article exists, it is over 0
          
            this.suggestionsList = response;
            resolve(this.suggestionsList);
         
        
        
        },
        msg=>{
            console.log("quiz.service in reject: "+msg);
            reject('Timeout, Please try with a different Subject');
           
    });
        
        }
    );
        return promise;
    }

}