/// <reference types="cypress" />

var Chance = require ('chance');

var chance = new Chance();

let firstName = chance.first();
let lastName = chance.last();
let emailInvalido = chance.email();

describe('Cadastro', () => {

    it('Quando o usuário informar um e-mail inválido, então o sistema exibirá uma mensagem de erro e não será possível prosseguir com o cadastro', () => {
        
        cy.visit('http://automationpractice.com/index.php')

        cy.get('.login').click()
        cy.get('input[name=email_create]').type(emailInvalido.replace('@', '#'))
        cy.get('button[name=SubmitCreate]').click()
        cy.get('#create_account_error').should('contain.text', 'Invalid email address.')

    });

    it('Quando o usuário informar dados válidos, então o cadastro será efetuado', () => {
        cy.visit('http://automationpractice.com/index.php')

        cy.get('.login').click()
        cy.get('input[name=email_create]').type(chance.email())
        cy.get('button[name=SubmitCreate]').click()
        cy.get('#id_gender1').check()
        cy.get('#customer_firstname').type(firstName)
        cy.get('#customer_lastname').type(lastName)
        cy.get('input[name=passwd]').type('pass@w0rds')

        cy.get('select[name=days]').select(chance.d30())
        cy.get('select[name=months]').select(chance.month())
        cy.get('select[name=years]').select('1996')
        cy.get('input[name=optin]').check()
        cy.get('input[name=company]').type(chance.company())
        cy.get('#address1').type(chance.address())
        cy.get('input[name=city]').type(chance.city())
        cy.get('select[name=id_state]').select('Oklahoma')
        cy.get('input[name=postcode]').type('12345')
        cy.get('textarea[name=other]').type('Cypress Test')
        cy.get('input[name=phone_mobile]').type(chance.phone())
        cy.get('button[name=submitAccount]').click()
        cy.url().should('contain', 'my-account')
        cy.get('.account').should('contain', firstName + " " + lastName)
        cy.get('[title="View my shopping cart"]').should('contain.value', '')

    });

});