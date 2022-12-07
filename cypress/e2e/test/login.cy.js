/// <reference types="cypress" />

import LoginData from '../../data/userData'
import LoginPage from '../../page/login'


describe('Data driven login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    for (const record of LoginData) {
        it(`should attempt login with ${record.username}`, () => {

            LoginPage.login(record.username, record.password)
            if (record.username === "invalid_user" || record.username === "locked_out_user") { 
                cy.url().should('eq', record.expectedUrl);
                cy.get(LoginPage.loginMessage).should('have.text', record.message); 
            } else {
                cy.url().should('eq', record.expectedUrl);
                cy.contains('Products').should('be.visible')
            }
        })

    }
})