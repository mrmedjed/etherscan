import {
	userWithExistingEmail,
	userWithExistingUsername,
	userWithInvalidEmail,
	userWithInvalidPassword,
	userWithInvalidUsername,
	userWithMismatchingEmails,
	userWithMismatchingPasswords,
	userWithValidData,
} from '../fixtures/users';
import {
	populateRegistrationForm,
	registrationPage,
	registrationTestData,
	shouldBeRegistered,
	submitRegistration,
	textMessages,
	verifyConfirmationEmail,
	verifyWelcomeBackEmail,
} from '../pages/registrationPage';

context('Registration form tests', () => {
	beforeEach(() => {
		cy.visit('/register');
		cy.url().should('contain', '/register');
	}),
		it('Verify user can successfully register by populating mandatory fields', () => {
			/*
            1. Populate all mandatory fields with valid data
            2. Click on [Create an Account] button
            3. Verify user received confirmation email
            */
			// Step 1
			populateRegistrationForm(userWithValidData);
			// Step 2
			submitRegistration();
			// Step 3
			shouldBeRegistered(true);
		}),
		it('Verify user can successfully register by populating mandatory and optional fields', () => {
			/*
            1. Populate all mandatory fields with valid data
            2. Populate all optional fields with valid data
            3. Click on [Create an Account] button
            4. Verify user received confirmation email
            */
			// Step 1
			populateRegistrationForm(userWithValidData);
			// Step 2
			registrationPage.newsletterCheckbox().check({ force: true });
			// Step 3
			submitRegistration();
			// Step 4
			shouldBeRegistered(true);
		}),
		it('Verify error messages for mandatory fields', () => {
			/*
            1. Click on [Create an Account] button before populating any data
            2. Verify appropriate error messages are displayed for mandatory fields
            */
			// Step 1
			submitRegistration();
			// Step 2
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			registrationPage
				.emailError()
				.should('be.visible')
				.and('have.text', textMessages.emailError);
			registrationPage
				.confirmEmailError()
				.should('be.visible')
				.and('have.text', textMessages.confirmEmailError);
			registrationPage
				.passwordError()
				.should('be.visible')
				.and('have.text', textMessages.passwordError);
			registrationPage
				.confirmPasswordError()
				.should('be.visible')
				.and('have.text', textMessages.passwordError);
			registrationPage
				.termsAndConditionsError()
				.should('be.visible')
				.and('have.text', textMessages.termsAndConditionsError);
		}),
		// Skipping this test because the invalid email error is shown only after completing captcha
		it.skip('Verify user cannot register with invalid email', () => {
			/*
            1. Populate all mandatory fields with valid data (except email)
            2. Click on [Create an Account] button
            3. Verify appropriate error message is displayed and that user is not registered
            4. Repeat steps 1, 2 and 3 
            */
			// Step 1
			populateRegistrationForm(userWithInvalidEmail);
			// Step 2
			submitRegistration();
			// captcha done
			// Step 3
			registrationPage.incorrectEmailError().should('be.visible');
			shouldBeRegistered(false);

			// Step 1
			registrationPage
				.email()
				.clear()
				.type(registrationTestData.invalidEmailNoAt);
			registrationPage
				.confirmEmail()
				.clear()
				.type(registrationTestData.invalidEmailNoAt);
			// Step 2
			submitRegistration();
			// captcha done
			// Step 3
			registrationPage.incorrectEmailError().should('be.visible');
			shouldBeRegistered(false);

			// Step 1
			registrationPage
				.email()
				.clear()
				.type(registrationTestData.invalidEmailNoDotCom);
			registrationPage
				.confirmEmail()
				.clear()
				.type(registrationTestData.invalidEmailNoDotCom);
			// Step 2
			submitRegistration();
			// captcha done
			// Step 3
			registrationPage.incorrectEmailError().should('be.visible');
			shouldBeRegistered(false);

			// Step 1
			registrationPage
				.email()
				.clear()
				.type(registrationTestData.invalidEmailNoPrefix);
			registrationPage
				.confirmEmail()
				.clear()
				.type(registrationTestData.invalidEmailNoPrefix);
			// Step 2
			submitRegistration();
			// captcha done
			// Step 3
			registrationPage.incorrectEmailError().should('be.visible');
			shouldBeRegistered(false);
		}),
		it('Verify user cannot register with mismatching emails', () => {
			/*
            1. Populate all mandatory fields with email mismatch data
            2. Verify appropriate error message is displayed
            3. Click on [Create an Account] button
            4. Verify appropriate error message is displayed and user is not registered
            */
			// Step 1
			populateRegistrationForm(userWithMismatchingEmails);
			// Step 3
			registrationPage.confirmEmailError().should('be.visible');
			// Step 4
			submitRegistration();
			// Step 5
			registrationPage.confirmEmailError().should('be.visible');
			shouldBeRegistered(false);
		}),
		it('Verify user cannot register without accepting Terms and Conditions', () => {
			/*
            1. Populate all mandatory fields with valid data
            2. Uncheck Terms and Conditions
            3. Click on [Create an Account] button
            4. Verify appropriate error message is displayed and that user is not registered
            */
			// Step 1
			populateRegistrationForm(userWithValidData);
			// Step 2
			registrationPage
				.termsAndConditionsCheckbox()
				.uncheck({ force: true })
				.should('not.be.checked');
			// Step 3
			submitRegistration();
			// Step 4
			registrationPage.termsAndConditionsError().should('be.visible');
			shouldBeRegistered(false);
		}),
		it('Verify user cannot register with mismatching passwords', () => {
			/*
            1. Populate all mandatory fields with mismatching password data
            2. Verify appropriate error message is displayed
            3. Click on [Create an Account] button
            4. Verify appropriate error message is displayed and that user is not registered
            */
			// Step 1
			populateRegistrationForm(userWithMismatchingPasswords);
			// Step 2
			registrationPage.confirmPasswordError().should('be.visible');
			// Step 3
			submitRegistration();
			// Step 4
			registrationPage.confirmPasswordError().should('be.visible');
			shouldBeRegistered(false);
		}),
		it('Verify user cannot register with invalid password', () => {
			/*
            1. Populate all mandatory fields with valid data (except password)
            2. Verify appropriate error message is displayed
            3. Click on [Create an Account] button
            4. Verify appropriate error message is displayed and that user is not registered
            */
			// Step 1
			populateRegistrationForm(userWithInvalidPassword);
			// Step 2
			registrationPage
				.passwordError()
				.should('be.visible')
				.and('have.text', textMessages.passwordError);
			registrationPage
				.confirmPasswordError()
				.should('be.visible')
				.and('have.text', textMessages.passwordError);
			// Step 3
			submitRegistration();
			// Step 4
			registrationPage
				.passwordError()
				.should('be.visible')
				.and('have.text', textMessages.passwordError);
			registrationPage
				.confirmPasswordError()
				.should('be.visible')
				.and('have.text', textMessages.passwordError);
			shouldBeRegistered(false);
		}),
		it('Verify user cannot register with invalid username', () => {
			/*
            1. Populate all mandatory fields with valid data (except username)
            2. Verify appropriate error message is displayed
            3. Click on [Create an Account] button
            4. Verify appropriate error message is displayed and that user is not registered
            5. Repeat steps 1, 2, 3 and 4
            */
			// Step 1
			populateRegistrationForm(userWithInvalidUsername);
			// Step 2
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			// Step 3
			submitRegistration();
			// Step 4
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			shouldBeRegistered(false);

			// Step 1
			registrationPage
				.username()
				.clear()
				.type(registrationTestData.invalidUsernameSpaces);
			// Step 2
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			// Step 3
			submitRegistration();
			// Step 4
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			shouldBeRegistered(false);

			// Step 1
			registrationPage
				.username()
				.clear()
				.type(registrationTestData.invalidUsernameSpecialChars);
			// Step 2
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			// Step 3
			submitRegistration();
			// Step 4
			registrationPage
				.usernameError()
				.should('be.visible')
				.and('have.text', textMessages.usernameErorr);
			shouldBeRegistered(false);

			// Step 1
			registrationPage
				.username()
				.clear()
				.type(registrationTestData.invalidUsernameLong);
			// Step 2
			registrationPage.usernameError().should('not.be.visible');
			// Step 3
			submitRegistration();
			// Verifying that input doesn't accept more than 30 chars
			registrationPage
				.username()
				.should(
					'have.attr',
					'value',
					registrationTestData.invalidUsernameLong.slice(0, 30)
				);
			// In this case we are expecting the registration to pass because username input is not allowing more than 30 chars
			shouldBeRegistered(true);
		}),
		it('Verify all fields have correct attributes', () => {
			/*
            1. Verify the attributes of all input fields
            */
			registrationPage
				.username()
				.should('have.attr', 'type', 'text')
				.and('have.attr', 'placeholder', textMessages.usernamePlaceholder)
				.and('have.attr', 'required');
			registrationPage
				.email()
				.should('have.attr', 'type', 'email')
				.and('have.attr', 'placeholder', textMessages.emailPlaceholder)
				.and('have.attr', 'required');
			registrationPage
				.confirmEmail()
				.should('have.attr', 'type', 'email')
				.and('have.attr', 'placeholder', textMessages.confirmEmailPlaceholder)
				.and('have.attr', 'onpaste', 'return false')
				.and('have.attr', 'required');

			registrationPage
				.password()
				.should('have.attr', 'type', 'password')
				.and('have.attr', 'placeholder', textMessages.passwordPlaceholder)
				.and('have.attr', 'required');
			registrationPage
				.confirmPassword()
				.should('have.attr', 'type', 'password')
				.and('have.attr', 'placeholder', textMessages.passwordPlaceholder)
				.and('have.attr', 'required');

			registrationPage
				.termsAndConditionsCheckbox()
				.should('have.attr', 'type', 'checkbox')
				.and('have.attr', 'required');
			registrationPage
				.newsletterCheckbox()
				.should('have.attr', 'type', 'checkbox')
				.and('not.have.attr', 'required');
		}),
		it('Verify password strength messages', () => {
			/*
            1. Enter weak/medium/strong password into password field
            2. Verify appropriate message is displayed
            */
			// Step 1
			registrationPage
				.password()
				.should('be.visible')
				.type(registrationTestData.weakPassword);
			// Step 2
			registrationPage
				.passwordStrength()
				.should('have.text', textMessages.passwordStrengthWeak);

			// Step 1
			registrationPage
				.password()
				.clear()
				.type(registrationTestData.mediumPassword);
			// Step 2
			registrationPage
				.passwordStrength()
				.should('have.text', textMessages.passwordStrengthMedium);

			// Step 1
			registrationPage
				.password()
				.clear()
				.type(registrationTestData.strongPassword);
			// Step 2
			registrationPage
				.passwordStrength()
				.should('have.text', textMessages.passwordStrengthStrong);
		}),
		// Skipping this test because the existing username error is shown only after completing captcha
		it.skip('Verify user cannot register with existing username', () => {
			/*
            1. Populate all mandatory fields with valid data (make sure to use already existing username)
            2. Click on [Create an Account] button
            3. Verify appropriate error message is displayed and user is not registered
            */
			// Step 1
			populateRegistrationForm(userWithExistingUsername);
			// Step 2
			submitRegistration();
			// captcha done
			// Step 3
			registrationPage.usernameInUseError().should('be.visible');
			shouldBeRegistered(false);
		}),
		it('Verify user receives [Welcome back] email upon trying to register with existing email', () => {
			/*
            1. Populate all mandatory fields with valid data (make sure to use already existing email)
            2. Click on [Create an Account] button
            3. Verify [Welcome back] email is sent to the submitted email
            */
			// Step 1
			populateRegistrationForm(userWithExistingEmail);
			// Step 2
			submitRegistration();
			// captcha done
			// Step 3
			cy.get<Cypress.User>('@user').then((user) => {
				verifyConfirmationEmail(false, user.email);
				verifyWelcomeBackEmail(user.email);
			});
		});
});
