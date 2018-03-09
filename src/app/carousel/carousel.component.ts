import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Article } from '../models/article';
import {DomSanitizer} from '@angular/platform-browser';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  recommendersList:Article[]=[];
  countList:Article[]=[];
  myInterval: number = 0;
  _activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;
  numbList: number[] = [0,1,2,3,4,5,6,7,8];
  customIndex:number= this.recommendersList.length - this.numbList.length;
  endReach=false;
  //showIndicator: boolean = true;

  get activeSlideIndex(): number {
    return this._activeSlideIndex;
  };
  
  set activeSlideIndex(newIndex: number) {
    if(this._activeSlideIndex !== newIndex) {
      console.log('Active slider index would be changed!');
      if(newIndex>this.customIndex)
        this.endReach=true;
      else
        this.endReach=false;
      // here's the place for your "slide.bs.carousel" logic
    }
    this._activeSlideIndex = newIndex;
  };

  constructor(private quizService:QuizService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getRecommenderArticles();
    //this.countList = this.recommendersList.slice(0,this.recommendersList.length - this.numbList.length);

  }



  getRecommenderArticles(){
    
    
      //World Music Awards winners
    //Member states of the United Nations
    //Best Actor Academy Award winners
    
    
    
      this.quizService.getAllRecommenderArticles('en').then(
        response => {
         // this.suggestionsList = response;
        
          if(response.length >0)
          {
            //this.isConnected=true;
            this.recommendersList = response;
            this.countList = response.slice(0,this.recommendersList.length-this.numbList.length);
           // this.articleStatus="No Subject found. See subjects suggestions";
            console.log('Recommender articles loaded');
         
           
          }
          else{
    
           
            console.log('problem in getting recommender articles: response.length probably 0');
    
          
          }
    
        },
        reject=>{  
    
          console.log('in Reject: getRecommenderArticles');
     
        
    
        });
    }


    onSelectCarousel(suggestion:string){
      console.log('onSelectSuggestion(suggestion:string)');
      this.quizService.carouselSelected.next(suggestion);
  
    }

}
