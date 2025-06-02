/// <reference types="cypress" />
import 'cypress-plugin-api'

describe('API testing', () => {

    context('GET', () => {
        it('GET request with then', () => {
            cy.request('GET', '/api/cars/brands')
                .then((response) => {
                    const body = response.body.data;

                    expect(body).to.have.length(5);
                    expect(body.length).to.be.eq(5);
                    expect(body[0].title).to.be.eq('Audi');
                })
        });

        it('GET request with its', () => {
            cy.request('GET', '/api/cars/brands')
                .its('status')
                .should('eq', 200);
        });

        it('GET request with its', () => {
            cy.request('GET', '/api/cars/brands').should((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.data).to.have.length(5);
            })
        })

        it('Plugin', () => {

            cy.api('GET', '/api/cars/brands').should((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.data).to.have.length(5);
            })
        })
    });

    context('POST', () => {
        let sid;

        before(() => {
            const user = {
                "email": "michael.krasnovskyi+testUser1@gmail.com",
                "password": "ZSgeVQhuU3qkvlG",
            }

            cy.request('POST', '/api/auth/signin', user)
                .then((response) => {
                    const token = response.headers["set-cookie"][0].split(';')[0];
                    expect(typeof token).to.be.eq('string');
                    sid = token;
                })
        })

        it('POST - login as a user', () => {
            const user = {
                "email": "michael.krasnovskyi+testUser1@gmail.com",
                "password": "ZSgeVQhuU3qkvlG",
            }

            cy.request('POST', '/api/auth/signin', user)
                .then((response) => {
                    expect(response.status).to.be.eq(200);
                })
        });

        it('POST - add new car', () => {
            cy.log(sid);
            const newCar = {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            }

            cy.request({
                method: 'POST',
                url: '/api/cars',
                body: newCar,
                headers: {
                    'Cookie': sid
                }
            })
                .then((response) => {
                    const body = response.body.data;
                    expect(response.status).to.be.eq(201);
                    expect(body.carBrandId).to.be.eq(newCar.carBrandId);
                    expect(body.carModelId).to.be.eq(newCar.carModelId);
                    expect(body.mileage).to.be.eq(newCar.mileage);

                })
        });

        after(() => {
            cy.request({
                method: 'DELETE',
                url: '/api/cars/357554',
                headers: {
                    'Cookie': sid
                }
            })

        })

    });

})