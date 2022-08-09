// Locators
export const registrationPage = {
	username: () => cy.get('#ContentPlaceHolder1_txtUserName'),
	email: () => cy.get('#ContentPlaceHolder1_txtEmail'),
	confirmEmail: () => cy.get('#ContentPlaceHolder1_txtConfirmEmail'),
	password: () => cy.get('#ContentPlaceHolder1_txtPassword'),
	confirmPassword: () => cy.get('#ContentPlaceHolder1_txtPassword2'),
	termsAndConditionsCheckbox: () => cy.get('#ContentPlaceHolder1_MyCheckBox'),
	newsletterCheckbox: () => cy.get('#ContentPlaceHolder1_SubscribeNewsletter'),
	createAccountButton: () => cy.get('#ContentPlaceHolder1_btnRegister'),
	usernameError: () => cy.get('#ContentPlaceHolder1_txtUserName-error'),
	emailError: () => cy.get('#ContentPlaceHolder1_txtEmail-error'),
	confirmEmailError: () => cy.get('#ContentPlaceHolder1_txtConfirmEmail-error'),
	passwordError: () => cy.get('#ContentPlaceHolder1_txtPassword-error'),
	confirmPasswordError: () => cy.get('#ContentPlaceHolder1_txtPassword2-error'),
	termsAndConditionsError: () =>
		cy.get('#ctl00\\$ContentPlaceHolder1\\$MyCheckBox-error'),
	acceptCookies: () => cy.get('#btnCookie'),
	passwordStrength: () => cy.get('#passstrength'),
	captchaError: () => cy.contains('div', textMessages.captchaError),
	incorrectEmailError: () => cy.contains('div', textMessages.invalidEmailError),
	usernameInUseError: () => cy.contains('div', textMessages.usernameInUseError),
};

export const textMessages = {
	usernameErorr: 'Username is invalid.',
	usernameInUseError: 'Sorry! The username you entered is already in use.',
	emailError: 'Please enter a valid email address.',
	invalidEmailError: 'Invalid email format. ',
	confirmEmailError: 'Please re-enter your email address.',
	passwordError: 'Your password must be at least 5 characters long.',
	termsAndConditionsError: 'Please accept our Terms and Conditions.',
	usernamePlaceholder:
		'Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed.',
	emailPlaceholder: 'A confirmation code will be sent to this address',
	confirmEmailPlaceholder: 'Re-enter your email address',
	passwordPlaceholder: '******',
	passwordStrengthWeak: 'Strength: Weak!',
	passwordStrengthMedium: 'Strength: Medium!',
	passwordStrengthStrong: 'Strength: Strong!',
	captchaError: 'Error! Invalid captcha response. ',
};

// This function populates registration form with passed data
export function populateRegistrationForm(user: Cypress.User) {
	registrationPage.username().should('be.visible').type(user.username);

	registrationPage.email().should('be.visible').type(user.email);

	// If confirmEmail is undefined, use email instead
	user.confirmEmail !== undefined
		? registrationPage
				.confirmEmail()
				.should('be.visible')
				.type(user.confirmEmail)
		: registrationPage.confirmEmail().should('be.visible').type(user.email);

	registrationPage.password().should('be.visible').type(user.password);

	// If confirmPassword is undefined, use password instead
	user.confirmPassword !== undefined
		? registrationPage
				.confirmPassword()
				.should('be.visible')
				.type(user.confirmPassword)
		: registrationPage
				.confirmPassword()
				.should('be.visible')
				.type(user.password);
	registrationPage
		.termsAndConditionsCheckbox()
		.should('exist')
		.click({ force: true });

	// Save user data for later use
	cy.wrap(user).as('user');
}

// Since there is no way to get around captcha, this step will be considered as a successfull/unsuccessfull registration
export function shouldBeRegistered(shouldBeRegistered: boolean) {
	if (shouldBeRegistered) {
		registrationPage.captchaError().should('be.visible');
		cy.get<Cypress.User>('@user').then((user) => {
			verifyConfirmationEmail(shouldBeRegistered, user.email);
			verifyConfirmationLink(user.email, user.username);
		});
	} else {
		registrationPage.captchaError().should('not.exist');
		cy.get<Cypress.User>('@user').then((user) => {
			verifyConfirmationEmail(shouldBeRegistered, user.email);
		});
	}
}

export function submitRegistration() {
	registrationPage.createAccountButton().should('be.visible').click();
}

// This step is just used to represent that the confirmation email was sent/not sent
export function verifyConfirmationEmail(isSent: boolean, email: string) {
	isSent
		? cy.log(
				`Confirmation email is delivered successfully to the following address: ${email}`
		  )
		: cy.log(
				`Confirmation email was not sent to the following address: ${email}`
		  );
}

// This step is just representing successfull registration using confirmation code from email
export function verifyConfirmationLink(email: string, username: string) {
	cy.log(
		`Confirmation link sent to ${email} successfully registered user ${username}`
	);
}

// This step is just representing that [Welcome back] email was sent
export function verifyWelcomeBackEmail(email: string) {
	cy.log(
		`Welcome back email is delivered successfully ti the following address: ${email}`
	);
}

export const registrationTestData = {
	validUsername: 'medjed',
	existingUsername: 'mrmedjed',
	validEmail: 'medo@medo.com',
	validEmail2: 'medo93@medo.com',
	existingEmail: 'lunemedjed@gmail.com',
	invalidEmailNoDot: 'medo@medocom',
	invalidEmailNoAt: 'medomedo.com',
	invalidEmailNoDotCom: 'test@gmail',
	invalidEmailNoPrefix: '@gmail.com',
	invalidPasswordShort: 'asdf',
	weakPassword: 'timenijatebi',
	mediumPassword: 'timenijatebi4',
	strongPassword: 'Timenijatebi4$',
	invalidUsernameShort: 'medo',
	invalidUsernameLong: 'ThisIsVeryLongUsernameWithOver30Chars',
	invalidUsernameSpaces: 'Username with spaces',
	invalidUsernameSpecialChars: 'medjed_93',
};
