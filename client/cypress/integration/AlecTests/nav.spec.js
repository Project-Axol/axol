describe('Ensure we can switch between servers', function(){
  it('selects a server and checks to make sure redux is updated',
    function() {
      cy.viewport(1100, 660)
      cy.visit('http://localhost:3000/dashboard')
      //   cy.get('.email')
      //       .type('test2@gmail.com')
      //   cy.get('.password')
      //       .type('aaaaaa')
      //   cy.get('button[type=submit]').click()
      cy.get('.trying').click()
      cy.get('.header-server-name').contains('trying')
    }
  )
})

describe('Ensure we can switch between channels', function() {
  it('selects a channel and checks to make sure messages are updated',
    function() {
      cy.viewport(1100, 660)
      setTimeout(() => {
        cy.get('.general').click()
      }, 1000)
    }
  )
})

describe('Ensure server settings are updated', function() {
  it('tests and updates server settings',
    function() {
      cy.viewport(1100, 660)
      cy.get('.settings-button').click()
      cy.get('.server-settings-button').click()
      cy.get('.exit-server-settings').click()
    }
  )
})

describe('Creates a new category in a server', function() {
  it('creates and tests that we can create a new category',
    function() {
      cy.viewport(1100, 660)
      cy.get('.settings-button').click()
      cy.get('.category-button').click()
      cy.get('.new-category-name').type('aaa')
      // cy.get('.new-cat-cancel').click()
    }
  )
})

describe('Ensure we can create a new channel', function() {
  it('creates a new channel', 
    function() {
      cy.viewport(1100, 660)
      cy.get('.plus-button-general').click()
      cy.get('.new-channel-input').type('test')
      // cy.get('.new-channel-button').click()
    }
  )
})