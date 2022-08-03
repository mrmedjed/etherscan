// Locators
export const registrationPage = {
    username: () => cy.get('#ContentPlaceHolder1_txtUserName'),
    email: () => cy.get('#ContentPlaceHolder1_txtEmail'),
    confirmEmail: () => cy.get('#ContentPlaceHolder1_txtConfirmEmail'),
    password: () => cy.get('#ContentPlaceHolder1_txtPassword'),
    confirmPassword: () => cy.get('#ContentPlaceHolder1_txtPassword2'),
    termsAndConditionsCheckbox: () => cy.get('#ContentPlaceHolder1_MyCheckBox'),
    createAccountButton: () => cy.get('#ContentPlaceHolder1_btnRegister'),
    usernameError: () => cy.get('#ContentPlaceHolder1_txtUserName-error'),
    emailError: () => cy.get('#ContentPlaceHolder1_txtEmail-error'),
    confirmEmailError: () => cy.get('#ContentPlaceHolder1_txtConfirmEmail-error'),
    passwordError: () => cy.get('#ContentPlaceHolder1_txtPassword-error'),
    confirmPasswordError: () => cy.get('#ContentPlaceHolder1_txtPassword2-error'),
    termsAndConditionsError: () => cy.get('#ctl00\\$ContentPlaceHolder1\\$MyCheckBox-error'),
    acceptCookies: () => cy.get('#btnCookie'),
    //usernameError: () => cy.get('#ContentPlaceHolder1_txtUserName-error'),

}

export const textMessages = {
    usernameErorr: 'Username is invalid.',
    emailError: 'Please enter a valid email address.',
    confirmEmailError: 'Please re-enter your email address.',
    passwordError: 'Your password must be at least 5 characters long.',
    termsAndConditionsError: 'Please accept our Terms and Conditions.',
    usernamePlaceholder: 'Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed.',
}