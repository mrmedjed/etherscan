import { registrationPage, textMessages } from "../../pages/RegistrationPage";

context('Registration form tests', () => {
    beforeEach(() => {
        cy.visit('/register');
        cy.url().should('contain', '/register');
    }),

    /*it('test1', () => {
        registrationPage.username().should('be.visible').type('medjed');
        registrationPage.email().should('be.visible').type('medo@medo.com');
        registrationPage.confirmEmail().should('be.visible').type('medo@medo.com');
        
    }),*/

    it('Test mandatory fields', () => {
        registrationPage.username().should('have.attr', 'placeholder', textMessages.usernamePlaceholder);
        registrationPage.createAccountButton().should('be.visible').click();
        registrationPage.usernameError().should('be.visible').and('have.text', textMessages.usernameErorr);
        registrationPage.emailError().should('be.visible').and('have.text', textMessages.emailError);
        registrationPage.confirmEmailError().should('be.visible').and('have.text', textMessages.confirmEmailError),
        registrationPage.passwordError().should('be.visible').and('have.text', textMessages.passwordError);
        registrationPage.confirmPasswordError().should('be.visible').and('have.text', textMessages.passwordError);
        registrationPage.termsAndConditionsError().should('be.visible').and('have.text', textMessages.termsAndConditionsError);
        
    })
})