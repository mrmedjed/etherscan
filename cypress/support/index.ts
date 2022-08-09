/// <reference types="cypress"/>

declare namespace Cypress {
	/*
    This interface is used for user data
    */
	interface User {
		readonly username: string;
		readonly email: string;
		readonly password: string;
		readonly confirmEmail?: string;
		readonly confirmPassword?: string;
	}
}
