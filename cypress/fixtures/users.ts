import { registrationTestData } from '../pages/RegistrationPage';

export const userWithValidData: Cypress.User = {
	username: registrationTestData.validUsername,
	email: registrationTestData.validEmail,
	password: registrationTestData.strongPassword,
};

export const userWithInvalidEmail: Cypress.User = {
	username: registrationTestData.validUsername,
	email: registrationTestData.invalidEmailNoDot,
	password: registrationTestData.strongPassword,
};

export const userWithMismatchingEmails: Cypress.User = {
	username: registrationTestData.validUsername,
	email: registrationTestData.validEmail,
	password: registrationTestData.strongPassword,
	confirmEmail: registrationTestData.validEmail2,
	confirmPassword: registrationTestData.strongPassword,
};

export const userWithMismatchingPasswords: Cypress.User = {
	username: registrationTestData.validUsername,
	email: registrationTestData.validEmail,
	password: registrationTestData.strongPassword,
	confirmEmail: registrationTestData.validEmail,
	confirmPassword: registrationTestData.mediumPassword,
};

export const userWithInvalidPassword: Cypress.User = {
	username: registrationTestData.validUsername,
	email: registrationTestData.validEmail,
	password: registrationTestData.invalidPasswordShort,
};

export const userWithInvalidUsername: Cypress.User = {
	username: registrationTestData.invalidUsernameShort,
	email: registrationTestData.validEmail,
	password: registrationTestData.strongPassword,
};

export const userWithExistingUsername: Cypress.User = {
	username: registrationTestData.existingUsername,
	email: registrationTestData.validEmail,
	password: registrationTestData.strongPassword,
};

export const userWithExistingEmail: Cypress.User = {
	username: registrationTestData.validUsername,
	email: registrationTestData.existingEmail,
	password: registrationTestData.strongPassword,
};
