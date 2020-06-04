//bonsa 1
describe('Ensure we can get the auth page of Axol and sign in with username and password', function() {
    it('visit the axol website and logs in with username and password', function() {
        cy.visit('http://localhost:3000/')
        cy.get('.email')
            .type('test2@gmail.com')
        cy.get('.password')
            .type('aaaaaa')
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/dashboard')
    })
})

//bonsa 2
describe('Ensure session is persiststed', function() {
    it('visit the axol website and shoud be routed to dashboard automatically', function() {
        cy.visit('http://localhost:3000/')
        cy.url().should('include', '/dashboard')
    })
})

// bonsa 3
describe('loguser out and terminate session', function() {
    it('log user out of account', function() {
        cy.visit('http://localhost:3000/')
        cy.url().should('include', '/dashboard')
        cy.get('.logout > button').click()
            // cy.url().should('/')
    })
})

//bonsa 4
describe('Can switch to signup mode', function() {
    it('clicks the sign up option to switch mode', function() {
        cy.visit('http://localhost:3000/')
        cy.get('.strong-link').click()
    })
})

//bonsa 5
describe('sign up a user', function() {
    it('fills the form and validates the input', function() {
        cy.visit('http://localhost:3000/')
        cy.get('.strong-link').click()
        cy.get('.userName').type('someuser')
        cy.get('.email')
            .type('test5@gmail.com')
        cy.get('.password')
            .type('aaaaaa')
        cy.get('.cPassword')
            .type('aaaaaa')

    })
})