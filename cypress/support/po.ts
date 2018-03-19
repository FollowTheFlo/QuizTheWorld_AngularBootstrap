const url = 'http://localhost:4200';

export const navigateTo = () => cy.visit(url);

export const getMainTitle = () => cy.get('.MainTitle');

export const getLaunchQuizTitle = () => cy.get('#LAUNCH_QUIZ');

export const SelectLanguageBoxFrench = () =>
{
    cy.get('#LanguageButton').click();
  //element(by.id('LanguageButton')).click();
  cy.get('.dropdown-item').contains('Fr').click();

// element(by.cssContainingText('.dropdown-item','Fr')).click();
//cy.get('#Fr').click();
 // element(by.id('Fr')).click();
}