
describe('Actions', () => {
    beforeEach(() => {
        // cy.visit('/')
    })

    it('click', () => {
        cy.contains('Sign up').click();
        cy.contains('Register').click({ force: true });
    })

    it('fill', () => {
        // cy.visit('https://rozetka.com.ua/');
        // cy.get('input[name="search"]').type('Телефон{enter}')
        cy.contains('Sign up').click();
        // cy.get('[id="signupName"]').type('HelloWorld', { delay: 1000 });
        cy.get('[id="signupName"]')
            .type('HelloWorld')
            .clear()
            .type('HelloWorld');
    });


    it('dropdown', () => {
        cy.visit('https://practice.expandtesting.com/dropdown');
        cy.get('select#dropdown').select('1');
        cy.get('select#dropdown').select('Option 2');
        cy.get('select#dropdown').select(1);

        cy.get('select#dropdown').should('have.value', '1');
    });


    it('custom dropdown', () => {
        cy.visit('http://127.0.0.1:5500/custom-dropdown.html');
        cy.get('button').click();
        cy.get('div#myDropdown').should('be.visible');
        cy.contains('About').click();
        cy.get('div#myDropdown').should('not.be.visible');
        cy.url().should('include', '#about');
    });

    it('checkbox', () => {
        cy.visit('https://practice.expandtesting.com/checkboxes');
        cy.get('input#checkbox1').check();
        cy.get('input#checkbox2').uncheck();

        cy.get('input#checkbox1').should('be.checked');
        cy.get('input#checkbox2').should('not.be.checked');

    });

    it('radio buttons', () => {
        cy.visit('https://practice.expandtesting.com/radio-buttons');
        cy.get('input#black').check();
        cy.get('input#red').check();
        cy.get('input#red').should('be.checked');

        cy.get('[name="color"]').not('input#red').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        })
    });

    it('focus', () => {
        cy.visit('/');
        cy.contains('Sign In').click();
        cy.get('#signinEmail').focus();
        cy.get('#signinEmail').blur();
    });

    it('file upload', () => {
        cy.visit('https://practice.expandtesting.com/upload');
        cy.get('input[data-testid="file-input"]').selectFile('test-file.txt');
        cy.get('form').submit();
    });

    it('wrap', () => {
        const testString = 'new string';
        cy.wrap(testString).should('contain', 'string')
    });


    it('Multiple tabs', () => {
        cy.visit('/');
        cy.get('span.icon-facebook').parent().invoke('removeAttr', 'target').click();
        cy.origin('https://www.facebook.com', () => {
            cy.get('h1').should('have.text', 'Sorry, something went wrong.');
        })

    });

    it.only('email generator', () => {
        const email = `michael.krasnovskyi+testUser${Date.now()}@gmail.com`
        cy.log(email);
    });



    describe('Tables', () => {

        beforeEach(() => {
            cy.visit('http://127.0.0.1:5500/custom-tables.html')
        })

        it.only('Verify number of columns', () => {
            cy.get('table th').should('have.length', 3);
        });

        it.only('Verify headers', () => {
            const headerNames = ['Company', 'Contact', 'Country']
            cy.get('table th').each((header, index) => {
                cy.wrap(header).invoke('text').should('eq', headerNames[index]);
            })
        });

        it.only('Verify number of rows', () => {
            cy.get('tbody>tr').should('have.length', 7);
        });

        it.only('Verify data in first row', () => {
            const rowData = ['Centro comercial Moctezuma', 'Francisco Chang', 'Mexico'];
            cy.get('tbody>tr').eq(2).find('td').each((cell, index) => {
                // cy.wrap(cell).invoke('text').should('eq', rowData[index]);
                cy.wrap(cell).should('have.text', rowData[index]);
            })
        });
    })



})