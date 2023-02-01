describe('Blog app', function () {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3003/api/db/reset');

    cy.visit('http://localhost:3000/');
  });

  // describe('Login', function () {
  //   it('succeeds with correct credentials', function () {
  //     cy.contains('show log in').click();
  //     cy.get('#username').type('root');
  //     cy.get('#password').type('123456');
  //     cy.get('#log-in').click();

  //     cy.contains('logged in');
  //   });

  //   it('fails with wrong credentials', function () {
  //     cy.contains('show log in').click();
  //     cy.get('#username').type('root');
  //     cy.get('#password').type('1234567');
  //     cy.get('#log-in').click();

  // cy.get('.error')
  //   .should('contain', 'wrong')
  //   .and('have.css', 'color', 'rgb(255, 0, 0)')
  //   .and('have.css', 'border-style', 'solid');
  //   });
  // });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('root', '123456');
    });

    // it('A blog can be created', function () {
    //   cy.contains('new blog').click();
    //   cy.get('#title').type('type title');
    //   cy.get('#author').type('type author');
    //   cy.get('#url').type('type url');
    //   cy.get('#create-blog').click();

    //   cy.get('.success')
    //     .should('contain', 'a new blog type title by type author added')
    //     .and('have.css', 'color', 'rgb(0, 128, 0)')
    //     .and('have.css', 'border-style', 'solid');

    //   cy.contains('type title');
    // });
  });
});
