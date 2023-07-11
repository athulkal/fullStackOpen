describe('Blog list app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
    const user = {
      username: 'root',
      name: 'athul',
      password: 'sekret',
    }
    const user2 = {
      username: 'test',
      name: 'tester',
      password: 'sekret',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('/')
  })
  it('on initial load renders the login page', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })
  describe('when a user logs in ', function () {
    it('is successful', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login').click()
      cy.contains('athul logged in')
    })
    it('it fails', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.get('.error')
        .contains('Please enter a valid username and password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
    })
    it('the user can create a note', function () {
      cy.contains('create').click()
      cy.get('#title').type('new blog from cypress')
      cy.get('#author').type('me')
      cy.get('#url').type('www.test.com')
      cy.get('#create-btn').click()
      cy.contains('new blog from cypress me')
    })
    describe('when a note already exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another new blog from cypress',
          author: 'me',
          url: 'www.example.com',
          likes: 10,
        })
      })
      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.get('#like').click()
        cy.contains('likes : 1')
      })
      it('a user can delete the blog he created', function () {
        cy.contains('view').click()
        cy.contains('delete').click()
      })
      it('a user can only see delete button if the blog is created by him', function () {
        cy.contains('view').click()
        cy.get('#delete').should('contain', 'delete')
        cy.contains('logout').click()
        cy.login({ username: 'test', password: 'sekret' })
        cy.contains('view').click()
        cy.should('not.contain', 'delete')
      })
      it('the blogs are arranged according to their amount of likes', function () {
        cy.createBlog({
          title: 'blog number two from cyp',
          author: 'me',
          url: 'www.example.com',
          likes: 12,
        })
        cy.createBlog({
          title: 'blog number three from cyp',
          author: 'me',
          url: 'www.example.com',
          likes: 22,
        })
        cy.get('.blog').eq(0).should('contain', 'blog number three from cyp me')
        cy.get('.blog').eq(1).should('contain', 'blog number two from cyp me')
        cy.get('.blog')
          .eq(2)
          .should('contain', 'another new blog from cypress me')
      })
    })
  })
})
