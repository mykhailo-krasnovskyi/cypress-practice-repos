/// <reference types="cypress" />


describe('Search elements', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('by CCS selector', () => {
        cy.get('h1');
    })

    it('by text(contains)', () => {
        // cy.contains('Do more!');
        // cy.get('button').contains('About');
        // cy.contains('button', 'About');
    })

    it('by find', () => {
        cy.get('header').find('button');
    })


    it('by children', () => {
        cy.get('header').find('button');
        cy.get('nav').children('button');
    })

    it('by parent', () => {
        // cy.get('[appscrollto="aboutSection"]').parent().parent().parent();
        cy.get('[appscrollto="aboutSection"]').parents('header');
    })

    it('by closest', () => {
        cy.get('[appscrollto="aboutSection"]').closest('button');
    })

    it('by within', () => {
        cy.contains('Sign up').click();
        cy.get('.modal-content').within(() => {
            cy.get('.btn-primary');
            cy.root().parent();
        })
        cy.get('.modal-content .btn-primary')
    })


    it('invoke', () => {
        // cy.get('.hero-descriptor').invoke('hide');
        // cy.wait(4000);
        // cy.get('.hero-descriptor').invoke('show');
        // cy.wait(4000);
        cy.get('h1').invoke('attr', 'class').should('contain', 'hero-descriptor_title');
    })

    it('then', () => {
        cy.get('h1').invoke('text').then((textFromElement) => {
            cy.log('Message: ' + textFromElement);
        })
    })

    it('wrap', () => {
        cy.get('h1').invoke('text').then((textFromElement) => {
            cy.wrap(textFromElement).should('equal', 'Do more!')
        })
    })

    it('its', () => {
        // cy.get('.socials_link').its('length').should('eq', 5);
        // cy.get('h1').its('innerHTML').should('eq', 'Do more!');

        const obj = {
            name: 'Joe',
            age: 14,
            country: 'USA'
        }

        cy.wrap(obj).its('name').should('eq', 'Joe');
    })

    it.only('aliases', () => {
        // let buttonSelector = '.hero-descriptor_btn';
        cy.get('.hero-descriptor_btn').as('signInButton');
        cy.get('@signInButton').click();
        cy.get('@signInButton').should('be.visible');
        cy.get('@signInButton').should('have.text', 'Sign up');

    })

    describe('Multiple elements', () => {

        it('first, last, eq', () => {
            cy.get('.socials_link').first();
            cy.get('.socials_link').last();
            cy.get('.socials_link').eq(2);
        })


        it('filter', () => {
            cy.get('.socials_link').filter('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]')
        })

        it('each', () => {
            cy.get('.list-item').each(($item, index, $list) => {

                cy.wrap($item).click(); // Наприклад, натискання на кожен елемент
            });
        })

    })
})