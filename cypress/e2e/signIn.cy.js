/// <reference types="cypress" />
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
describe('Sign In tests with POM', () => {

    beforeEach(() => {
        HomePage.visit();
        HomePage.openSignInForm();
    });

    it.only('Sign in using commands', () => {
        cy.login('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        cy.get('h1').should('have.text', 'Garage');
    });

    it('Successful sign in', () => {
        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        cy.get('h1').should('have.text', 'Garage');
    });

    it('Sign in without email', () => {
        SignInForm.triggerEmptyErrorMessageForField('email');
        SignInForm.enterPassword('1241421421');
        // SignInForm.loginButton.should('be.disabled');
        SignInForm.verifyLoginButtonIsDisabled();
        SignInForm.verifyErrorMessageForFieldIsVisible('email');
    });

    it('Sign in without password', () => {
        SignInForm.triggerEmptyErrorMessageForField('password');
        SignInForm.enterEmail('michael.krasnovskyi+testUser1@gmail.com');
        SignInForm.verifyLoginButtonIsDisabled();
        SignInForm.verifyErrorMessageForFieldIsVisible('password');
    });

    it('Sign in with invalid email', () => {
        SignInForm.enterEmail('michael.krasnovskyi');
        SignInForm.enterPassword('ZSgeVQhuU3qkvlG');
        SignInForm.verifyLoginButtonIsDisabled();
        SignInForm.verifyIncorrectEmailMessageIsVisible();
        // SignInForm.verifyErrorMessageIsVisible('Email is incorrect');
    });

    it('Sign in with incorrect credentials', () => {
        SignInForm.loginWithCredentials('michael.krasnovskyi+testU4242ser1@gmail.com', 'ZSgeVQh4242uU3qkvlG');
        SignInForm.verifyWrongDataMessageIsVisible();
    });
})

describe.skip('Sign In tests without POM', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.header_signin').click();
    });

    it('Successful sign in', () => {
        cy.get('#signinEmail').type('michael.krasnovskyi+testUser1@gmail.com');
        cy.get('#signinPassword').type('ZSgeVQhuU3qkvlG');
        cy.get('app-signin-modal .btn-primary').click();
        cy.get('h1').should('have.text', 'Garage');
    });

    it('Sign in without email', () => {
        cy.get('#signinEmail').focus().blur();
        cy.get('#signinPassword').type('ZSgeVQhuU3qkvlG');
        cy.get('app-signin-modal .btn-primary').should('be.disabled');
        cy.contains('Email required').should('be.visible');
    });

    it('Sign in without password', () => {
        cy.get('#signinEmail').type('michael.krasnovskyi+testUser1@gmail.com');
        cy.get('#signinPassword').focus().blur();
        cy.get('app-signin-modal .btn-primary').should('be.disabled');
        cy.contains('Password required').should('be.visible');
    });

    it('Sign in with invalid email', () => {
        cy.get('#signinEmail').type('michael.krasnovskyi');
        cy.get('#signinPassword').type('ZSgeVQhuU3qkvlG');
        cy.get('app-signin-modal .btn-primary').should('be.disabled');
        cy.contains('Email is incorrect').should('be.visible');
    });

    it('Sign in with incorrect credentials', () => {
        cy.get('#signinEmail').type('michael.krasnovskyi+testUse2442r1@gmail.com');
        cy.get('#signinPassword').type('ZSgeVfasfaQhuU3qkvlG');
        cy.get('app-signin-modal .btn-primary').click();
        cy.contains('Wrong email or password').should('be.visible');
    });
})