describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Imanol Bernal',
      username: 'ibernal',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  describe('login', function() {

    it('login form is shown', function () {
      cy.contains('log in to application')
    })

    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('ibernal')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('Imanol Bernal logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login')
      cy.get('#username').type('ibernal')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      // cy.contains('wrong credentials')
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'Imanol Bernal logged in')
    })
  })
  
  
  
  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'ibernal', password: '1234' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Imanol Bernal')
      cy.get('#url').type('https://newurl.com/url')
      cy.get('#new-blog-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'new blog1 with cypress',
          author: 'Imanol Bernal',
          url: 'http://test1.com/test1'
        })
        cy.addBlog({
          title: 'new blog2 with cypress',
          author: 'Imanol Bernal',
          url: 'http://test2.com/test2'
        })
        cy.addBlog({
          title: 'new blog3 with cypress',
          author: 'Imanol Bernal',
          url: 'http://test3.com/test3'
        })
      })
      it('a user can like a blog', function() {
        cy.contains('new blog2 with cypress').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        
        cy.contains('new blog2 with cypress').parent().get('.like-button').as('likeButton')
        cy.get('@likeButton')
          .click()
          .parent()
          .should('contain', 'likes 1')
  
      })
      it('a user can remove the blog created by himself', function() {
        cy.contains('new blog2 with cypress').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        
        cy.contains('new blog2 with cypress').parent().as('blogContent')
        cy.get('@blogContent').parent().contains('Remove').as('removeButton')
        cy.get('@removeButton').click()
        
        cy.get('html').should('not.contain', 'new blog2 with cypress')
  
      })

      it('a user cannot remove a blog created by another user', function() {

        cy.addNewUser({ name: 'New User', username: 'newUser', password: '1234' })
        cy.postNewBlog({ 
          username: 'newUser',
          password: '1234',
          title: 'a new blog created by newUser',
          author: 'New User',
          url: 'http://newuser.com/new'
        })
        cy.login({ username: 'ibernal', password: '1234' })

        cy.contains('a new blog created by newUser')
          .parent()
          .find('button')
          .click()

        cy.contains('a new blog created by newUser').parent().as('blogContent')
        
        cy.get('@blogContent')
          .parent()
          .should('not.contain', 'Remove')
        
        cy.get('html').should('contain', 'a new blog created by newUser')
     
      })

      it('the blogs are ordered by number of likes', function() {

        cy.getBlogsAndUpdateLikes({blog1Likes:45, blog2Likes:100, blog3Likes:200})
        cy.get('[id=blogs] div').as('blogContent')
        cy.get('@blogContent').children().first().as('firstElement')
        cy.get('@firstElement').should('contain', 'new blog3 with cypress')

      })

    })
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', ({ title, author,url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { 
      title,
      author,
      url
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addNewUser', ({name, username, password}) => {
  
  const user = { name, username, password }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
        
})

Cypress.Commands.add('postNewBlog', ({username, password, title, author, url}) => {
  let token
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      token = body.token
      cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
          'Authorization': `bearer ${token}`
        }
      })    
  })
})

Cypress.Commands.add('changeLikes', ({id, newLikes}) => {
  cy.request({
    url: `http://localhost:3001/api/blogs/${id}`,
    method: 'PUT',
    body: { likes: newLikes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
})

Cypress.Commands.add('getBlogsAndUpdateLikes', ({blog1Likes, blog2Likes, blog3Likes}) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'GET',
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  }).then(({ body }) => {
    cy.changeLikes({id:body[0].id, newLikes: blog1Likes})
    cy.changeLikes({id:body[1].id, newLikes: blog2Likes})
    cy.changeLikes({id:body[2].id, newLikes: blog3Likes})
    cy.visit('http://localhost:3000')
  })
  
})