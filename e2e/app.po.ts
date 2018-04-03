import { browser, by, element } from 'protractor';
var fs = require('fs');

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }


getElementByID(el:string){

  return element(by.id(el));
}

SelectLanguageBoxFrench()
{
  element(by.id('LanguageButton')).click();
 element(by.cssContainingText('.dropdown-item','Fr')).click();
 // element(by.id('Fr')).click();
}

  getLaunchQuizTitle(){ 
  return element(by.id('LAUNCH_QUIZ')).getText();

}

EnterKeyword(kw:string){
  var el = element(by.id('targetInputValue'));
  el.clear();
  el.sendKeys(kw);
}

waitMilliSeconds(time:number){
  browser.driver.sleep(3000);
  browser.waitForAngular();
}

clickLaunchButton(){

  element(by.id('LaunchQuizButton')).click();

 

}



  getButtonLaunch(){

    let callButton = element(by.model('button'));

    
/*
    element(by.css('some-css'));
    
        a list of elements:
    
         element.all(by.css('some-css'));
    
    Using chained locators to find:
    
        a sub-element:
    
         element(by.css('some-css')).element(by.tagName('tag-within-css'));
    
        to find a list of sub-elements:
    
         element(by.css('some-css')).all(by.tagName('tag-within-css'));
    // Click on the element.
el.click();

// Send keys to the element (usually an input).
el.sendKeys('my text');

// Clear the text in an element (usually an input).
el.clear();

// Get the value of an attribute, for example, get the value of an input.
el.getAttribute('value');
   */
   // element.all(by.css('some-css')).first().element(by.tagName('tag-within-css'));
   // element.all(by.css('some-css')).get(index).element(by.tagName('tag-within-css'));
   // element.all(by.css('some-css')).first().all(by.tagName('tag-within-css'));
  }


  takeScreenshot(fileName:string){

    browser.takeScreenshot().then( png =>  {
      var stream = fs.createWriteStream("screenshots/"+fileName+""+Date.now()+".png");
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });

    
  }

  setWindowSize(width:number,height:number){

    //browser.setScreenOrientation('PORTRAIT');
    //browser.driver.fullscreen();
    browser.manage().window().setSize(width,height);
  }
}
