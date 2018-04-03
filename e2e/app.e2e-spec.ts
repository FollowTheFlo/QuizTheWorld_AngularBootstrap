import { AppPage } from './app.po';

describe('qtw2-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
/*
  it('should display welcome message', () => {
    page.navigateTo();

  
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
*/

  it('Should display LaunchQuiz Header in french after selecting Fr Language', () => {
    page.navigateTo();
    page.SelectLanguageBoxFrench();

  
    expect(page.getLaunchQuizTitle()).toEqual('Lancer Quiz');
  });

  it('Should display Run Quiz portlet after entering keyword end press Launch within 3sec', () => {
    page.navigateTo();
    page.setWindowSize(600,800);
    page.EnterKeyword('Paris');
    page.clickLaunchButton();
    page.waitMilliSeconds(3000);
    
    //page.takeScreenshot('test_keyword2');
   
    expect(page.getElementByID('ANSWER_QUIZ').isPresent()).toBe(true);
  });



  it('Take screnshot is medium and small size', () => {
    page.navigateTo();
    page.setWindowSize(600,800);
    page.clickLaunchButton();
    page.waitMilliSeconds(3000);
    page.takeScreenshot('testSize_600_800__');

    page.setWindowSize(300,600);
    page.takeScreenshot('testSize_300_600__');
   
    expect(page.getElementByID('ANSWER_QUIZ').isPresent()).toBe(true);
  });

});
