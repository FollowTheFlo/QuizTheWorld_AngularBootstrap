// cypress/integration/spec.ts

  
  import { navigateTo, getMainTitle, getLaunchQuizTitle,SelectLanguageBoxFrench } from '../support/po';
  
  describe('Cypress tests for project QTW', () => {
    beforeEach(navigateTo);
  
    it('should display  \'Quiz The World\' as main title', () => {
      getMainTitle().contains('Quiz The World');
    });

    it('Should display LaunchQuiz Header in french after selecting Fr Language', () => {
 
      SelectLanguageBoxFrench();
  
      getLaunchQuizTitle().contains('Lancer Quiz');
     // expect(page.getLaunchQuizTitle()).toEqual('Lancer Quiz');
    });



  });