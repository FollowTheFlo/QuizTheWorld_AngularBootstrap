import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import  { Question } from "../models/question";
import { Quiz } from '../models/quiz';
import { Article } from '../models/article';


@Injectable()
export class SparqlService {
    results: string[];
    target_subjects_count:number;
    constructor(private http: HttpClient) {}

    getArticleCount(article:string,language:string):Promise<number>{
        
        let Query_article_count:string = this.get_locale_SPARQL_url(language)+"?query=PREFIX dbp: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23>PREFIX dbpprop: <http://dbpedia.org/property> PREFIX skos: <http://www.w3.org/2004/02/skos/core%23> PREFIX dcterms: <http://purl.org/dc/terms/>  PREFIX foaf: <http://xmlns.com/foaf/0.1/>"+
        "SELECT count(?article) as ?target_count  WHERE {?article rdfs:label '"+article+"'@"+language+" } &format=json";

        let promise = new Promise<number>((resolve, reject) => {
            
              this.http.get(Query_article_count)
                .toPromise()
                .then(
                  res => { // Success
                         
                    if(res && res['results'] && res['results']['bindings'] && res['results']['bindings']['0'] && res['results']['bindings']['0']['target_count'] && res['results']['bindings']['0']['target_count']['value'] )
                    {
                      if(+res['results']['bindings']['0']['target_count']['value'] >0)
                      {
                       //  this.getpopup('getArticleCount');
                         
                      
                        resolve(+res['results']['bindings']['0']['target_count']['value'] );
                      }
                    }
                   
                    resolve(0);
                    },
                          
                    msg => { // Error
                    reject(msg);
                    }
                );
            });
            return promise;

    }
  
    
    getArticleSubjectCount(article:string, language:string):Promise<number>{

        let Query_subject_count:string = this.get_locale_SPARQL_url(language)+"?query=PREFIX dbp: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23>PREFIX dbpprop: <http://dbpedia.org/property> PREFIX skos: <http://www.w3.org/2004/02/skos/core%23> PREFIX dcterms: <http://purl.org/dc/terms/>  PREFIX foaf: <http://xmlns.com/foaf/0.1/>"+
       "SELECT count( DISTINCT ?subject) as ?total_count WHERE {?article rdfs:label '"+article+"'@"+language+"."+
       "?article <http://purl.org/dc/terms/subject> ?subject} &format=json";

        let promise = new Promise<number>((resolve, reject) => {
            
            return  this.http.get(Query_subject_count)
                .toPromise()
                .then(
                  res => { // Success
                         
                    if(res && res['results'] && res['results']['bindings'] && res['results']['bindings']['0'] && res['results']['bindings']['0']['total_count'] && res['results']['bindings']['0']['total_count']['value'] )
                    {
                      if(+res['results']['bindings']['0']['total_count']['value'] >0)
                      {
                        // this.getpopup('getArticleSubjectCount: '+res['results']['bindings']['0']['total_count']['value']);
                        resolve(+res['results']['bindings']['0']['total_count']['value']);
                      }
                    }
                   
                    resolve(0);
                    },
                          
                    msg => { // Error
                    reject(msg);
                    }
                );
            });
            return promise;

    }

    getSubjectDistractorsCount(subjectIndex:number,article_target:string,language:string):Promise<number>{
        console.log('enter getSubjectDistractorsCount ');
                let Query_subject_distractors_count:string =this.get_locale_SPARQL_url(language)+"?query=PREFIX dbp: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23>"+
                "PREFIX dbpprop: <http://dbpedia.org/property> PREFIX skos: <http://www.w3.org/2004/02/skos/core%23> PREFIX dcterms: <http://purl.org/dc/terms/>  PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/>"+
  
                     "SELECT COUNT( DISTINCT ?distractor_label) as ?distractor_count WHERE{"+
                    "?distractor <http://purl.org/dc/terms/subject> ?distractor_subject."+
                    "?distractor_subject rdfs:label ?target_subject_label."+
                    "?distractor rdfs:label ?distractor_label."+
                    " FILTER (langMatches(lang(?distractor_label),'"+language+"'))"+
                    " FILTER (str(?distractor_label) != '"+language+"')"+
                    " {"+
                        " SELECT ?target_subject_label WHERE { "+
                        " ?target_article rdfs:label '"+article_target+"'@"+language+"."+
                        " ?target_article <http://purl.org/dc/terms/subject> ?target_subject."+
                        " ?target_subject rdfs:label ?target_subject_label. "+
                      "FILTER (langMatches(lang(?target_subject_label),'"+language+"'))"+
                      "FILTER (str(?target_subject_label) != '"+article_target+"')"+
                        "}"+
                        "OFFSET "+subjectIndex+" LIMIT 1"+
                    "}"+
                    "}"+
                    "&format=json";
        
                let promise = new Promise<number>((resolve, reject) => {
                    
                    return  this.http.get(Query_subject_distractors_count)
                        .toPromise()
                        .then(
                          res => { // Success
                                 
                            if(res && res['results'] && res['results']['bindings'] && res['results']['bindings']['0'] && res['results']['bindings']['0']['distractor_count'] && res['results']['bindings']['0']['distractor_count']['value'] )
                            {
                              if(+res['results']['bindings']['0']['distractor_count']['value'] >0)
                              {
                                 this.getpopup('getSubjectDistractorsCount: '+res['results']['bindings']['0']['distractor_count']['value']);
                                resolve(+res['results']['bindings']['0']['distractor_count']['value']);
                              }
                            }
                           
                            resolve(0);
                            },
                                  
                            msg => { // Error
                            reject(msg);
                            }
                        );
                    });
                    return promise;
        
            }
        

            getOneQuestionWithArticles(question:Question,target_name:string,target_subject_index:number,distractor_index:number,distractor_subject_index:number,distractor_subject_number:number,SELECTED_LOCALE:string):Promise<boolean>{
                let display_string:string;
                let GET_choices_OK_VERIF:boolean=false;
                let GET_choices_KO_VERIF:boolean = false;
                let is_valid:boolean =  false;
                distractor_subject_number--; //decreament from 1 as starting counting from 0

               //init the article as blank to avoid null objects
               //  question.subject_OK.article_name = "none";
                // question.subject_KO[0].article_name = "none";
              

                
                console.log('ENTERRRRR getOneQuestionWithArticles: '+distractor_subject_number);
                        let Query_question_articles:string =this.get_locale_SPARQL_url(SELECTED_LOCALE)+"?query=PREFIX dbp: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23>"+
                        "PREFIX dbpprop: <http://dbpedia.org/property>  PREFIX skos: <http://www.w3.org/2004/02/skos/core%23> PREFIX dcterms: <http://purl.org/dc/terms/>  PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/>"+
          
                        "SELECT ?distractor_subject_label ?distractor_label ?target_subject_label ?target_thumbnail ?distractor_thumbnail  ?target_link ?distractor_link  WHERE{"+
                        "?article rdfs:label ?distractor_label."+
                        "?article <http://purl.org/dc/terms/subject> ?distractor_subject."+
                        "?distractor_subject rdfs:label ?distractor_subject_label."+
                        "OPTIONAL {?distractor_link foaf:primaryTopic ?article}."+
                        "OPTIONAL {?article dbo:thumbnail ?distractor_thumbnail}."+
                        "FILTER (langMatches(lang(?distractor_subject_label),'"+SELECTED_LOCALE+"'))"+
                        "FILTER (str(?distractor_subject_label) != '"+target_name+"')"+
                        "FILTER NOT EXISTS"+
                        "{"+
                        "?temp_article rdfs:label '"+target_name+"'@"+SELECTED_LOCALE+"."+
                        "?temp_article <http://purl.org/dc/terms/subject> ?temp_subject."+
                        "?temp_subject rdfs:label ?distractor_subject_label."+
                        "}"+
                        "{"+
                            "SELECT DISTINCT ?distractor_label ?target_subject_label ?target_thumbnail ?target_link WHERE{"+
                            "?distractor <http://purl.org/dc/terms/subject> ?distractor_subject."+
                            "?distractor_subject rdfs:label ?target_subject_label."+
                            "?distractor rdfs:label ?distractor_label."+
                            "FILTER (langMatches(lang(?distractor_label),'"+SELECTED_LOCALE+"'))"+
                            "FILTER (str(?distractor_label) != '"+target_name+"')"+
                            "{"+
                                "SELECT ?target_subject_label ?target_thumbnail ?target_link WHERE{"+
                                "?target_article rdfs:label '"+target_name+"'@"+SELECTED_LOCALE+"."+
                                "?target_article <http://purl.org/dc/terms/subject> ?target_subject."+
                                "?target_subject rdfs:label ?target_subject_label."+
                              "OPTIONAL {?target_article dbo:thumbnail ?target_thumbnail}."+
                              "OPTIONAL {?target_article foaf:isPrimaryTopicOf ?target_link }."+
                              "FILTER (langMatches(lang(?target_subject_label),'"+SELECTED_LOCALE+"'))"+
                              "FILTER (str(?target_subject_label) != '"+target_name+"')"+
                                "}"+
                                "OFFSET "+target_subject_index+" LIMIT 1"+
                            "}"+
                            "}"+
                            " OFFSET "+distractor_index+" LIMIT 1"+
                       "}} OFFSET "+distractor_subject_index+" LIMIT "+distractor_subject_number+" &format=json";
                
                        let promise = new Promise<boolean>((resolve, reject) => {
                            
                            return  this.http.get(Query_question_articles)
                                .toPromise()
                                .then(
                                  res => { // Success
                                    
                                    //////////////////////////////

                                    if(res && res['results'] && res['results']['bindings'] && res['results']['bindings']['0'] && res['results']['bindings']['0']['target_subject_label'] )
                                    {
                                        console.log("flo 1");
                                        //subject OOK in each json row, we pull it on [0] to be sure to have it
                                        question.subject_OK.article_name = res['results']['bindings']['0']['target_subject_label']['value'];
                                        question.target_article.article_name = target_name;
                                        
                                        if(res['results']['bindings']['0']['target_thumbnail']){
                                            //subject_OK.thumbnail_url = JSON_response.results.bindings[0].target_thumbnail.value;
                                            question.target_article.thumbnail_url = res['results']['bindings']['0']['target_thumbnail']['value'];
                                        }
                                        if(res['results']['bindings']['0']['target_link']){
                                            //subject_OK.thumbnail_url = JSON_response.results.bindings[0].target_thumbnail.value;
                                            question.target_article.wiki_link = res['results']['bindings']['0']['target_link']['value'];
                                        }
                                    
                                         display_string = display_string + "OK-> "+ question.subject_OK.article_name + "\n";
                                         GET_choices_OK_VERIF=true;
                                         question.distractor_article.article_name= res['results']['bindings']['0']['distractor_label']['value'];
                                        
                                        if( res['results']['bindings']['0']['distractor_thumbnail'])
                                             question.distractor_article.thumbnail_url = res['results']['bindings']['0']['distractor_thumbnail']['value'];
                                            
                                        if( res['results']['bindings']['0']['distractor_link'])
                                             question.distractor_article.wiki_link = res['results']['bindings']['0']['distractor_link']['value'];
                                    
                                    //get the KO subjects stored in SPARQL var distractor_subject_label
                                        for (var i = 0; i < res['results']['bindings'].length ; i++)
                                        { 
                                            console.log("flo 3");
                                            if(res['results'] && res['results']['bindings'][''+i] && res['results'] && res['results']['bindings'][''+i]['distractor_subject_label'] )
                                            {
                                                question.subject_KO[i] =  new Article("subject",res['results']['bindings'][''+i]['distractor_subject_label']['value'],false);
                                                  
                                               //getting the picture of Distractor Subject if exists
                                                if( res['results']['bindings'][''+i]['distractor_subject_thumbnail'])
                                                     question.subject_KO[i].thumbnail_url = res['results']['bindings'][''+i]['distractor_subject_thumbnail']['value'];
                                                     
                                                if( res['results']['bindings'][''+i]['distractor_subject_link'])
                                                     question.subject_KO[i].wiki_link = res['results']['bindings'][''+i]['distractor_subject_link']['value'];
                                                    
                                                //console.log("Toast distractor:"+"i" + subject_KO[i].article_name);
                                                
                                                display_string = display_string + "KO "+i+" -> "+question.subject_KO[i].article_name+"\n";
                                                GET_choices_KO_VERIF=true;
                                                
                                            }
                                       
                                        }
                                     }
                                    else{
                                        
                                       
                                        //if no subject, add fake question

                                  

                                        //question.subject_KO[0].article_name = "none";
                                       // question.subject_OK.article_name = "none";
                                        
                                    }
                                    
                                    if(GET_choices_OK_VERIF && GET_choices_KO_VERIF)
                                    {
                                                    
                                        console.log("success collecting subject of OK and KO");
                                       // success = true;
                                        is_valid = true;
                                        question.is_valid = true;
                                        console.log("SET IS_VALID = TRUE");
                                    }
                                    else if(GET_choices_OK_VERIF==true && GET_choices_KO_VERIF==false)
                                    {
                                        //alert("No available choicess for subject "+target_name+" : "+subject_OK.article_name+"/n Please go to next Question" );
                                        
                                        console.log("No available choices for subject "+target_name+" : "+ question.subject_OK.article_name+"/n Please go to next Question");
                                    }
                                    
                                    
                                                            
                                                                       
                                    resolve(is_valid);
                                    },
                                          
                                    msg => { // Error
                                    reject(msg);
                                    }   
                                );
                            });
                            return promise;
                
                    }

    getpopup(message:string){
       // alert(message);
    }

    get_locale_SPARQL_url(SELECTED_LOCALE)
	{
		let locale_url:string= "https://dbpedia.org/sparql";
		
		if(SELECTED_LOCALE=="fr")
			locale_url="https://fr.dbpedia.org/sparql";
		else if(SELECTED_LOCALE=="es")
			locale_url="https://es.dbpedia.org/sparql";
		
		//alert("return locale: "+SELECTED_LOCALE+" ,url: "+locale_url);
		return locale_url;
	}
}
