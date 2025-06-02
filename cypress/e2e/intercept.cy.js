/// <reference types="cypress" />
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";

describe('Intercept', () => {

    it('Intercept query', () => {
        cy.intercept('GET', '/api/cars').as('getCars');
        HomePage.visit();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        cy.get('h1').should('have.text', 'Garage');
        cy.wait('@getCars').its('response.statusCode').should('eq', 200);
    });

    it.only('Fake response', () => {
        const fakeResponseBody = {
            "status": "ok",
            "data": [
                {
                    "id": 355652,
                    "carBrandId": 3,
                    "carModelId": 11,
                    "initialMileage": 999,
                    "updatedMileageAt": "2025-06-02T16:25:31.000Z",
                    "carCreatedAt": "2025-05-29T18:13:04.000Z",
                    "mileage": 1314,
                    "brand": "Ford",
                    "model": "Fiesta",
                    "logo": "audi.png"
                },
                {
                    "id": 262010,
                    "carBrandId": 1,
                    "carModelId": 2,
                    "initialMileage": 111,
                    "updatedMileageAt": "2025-02-21T18:15:41.000Z",
                    "carCreatedAt": "2025-02-21T18:15:41.000Z",
                    "mileage": 111,
                    "brand": "Audi",
                    "model": "R8",
                    "logo": "audi.png"
                }
            ]
        }

        cy.intercept('GET', '**/cars', fakeResponseBody);
        HomePage.visit();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        cy.get('h1').should('have.text', 'Garage');
    });

})