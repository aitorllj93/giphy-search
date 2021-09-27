describe('giphy-search', () => {
  describe('Given a browser with the app opened', () => {
    beforeEach(() => cy.visit('/'));

    it('Then it should display header', () => {
      cy.get('.navbar').contains('Search Images');
    });

    it('Then it should display search form', () => {
      cy.get('form').contains('Search');
    });

    it('Then it should display info message', () => {
      cy.get('.alert-info').contains('Insert tags and click on search to start');
    });

    describe('When user inserts some tags on tag input and presses the submit button', () => {
      beforeEach(() => {
        cy.get('.ng2-tag-input').click().type('cats{enter}');
        cy.get('button').click();
      });

      it('Then it should display results', () => {
        cy.get('.card').should('have.length', 9);
      });
    });
  });
});
