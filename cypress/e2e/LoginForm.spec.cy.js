describe('LoginForm component', () => {
    beforeEach(() => {
        // Visit the login page
        cy.visit('http://localhost:5173/auth/login');
    });

    it('should display all elements', () => {
        // Check if all inputs are visible and have correct placeholders

        cy.get('[data-testid=email-input-login-form]').should('be.visible').should('have.attr', 'placeholder', 'Email address*');
        cy.get('[data-testid=password-input-login-form]').should('be.visible').should('have.attr', 'placeholder', 'Password*');

        // Check if submit button is visible and has correct text based on isSignup prop
        cy.get('[data-testid=submit-button-login-form]').should('be.visible').contains('Log in');

        // Check if show password label is visible and has the correct text
        cy.get('[data-testid=show-password-label-login-form]').should('be.visible').contains('Show Password');

        // Check if signup button is visible
        cy.get('[data-testid=signup-button-login-form]').should('be.visible').contains('Sign Up');

    });

    it('should display error message for incorrect password', () => {
        // Enter email address
        cy.get('[data-testid=email-input-login-form]').type('annadehamburg@gmail.com');

        // Enter password
        cy.get('[data-testid=password-input-login-form]').type('the wrong password');

        // Submit the form
        cy.get('[data-testid=submit-button-login-form]').click();

        // Check if error message is visible and contains the correct text
        cy.get('.alert-danger').should('be.visible').contains('Incorrect email or password.');
    });

    it('should display password when "Show Password" checkbox is checked', () => {
        // Enter password
        cy.get('[data-testid=password-input-login-form]').type('thePassword');
      
        // Check the "Show Password" checkbox
        cy.get('[data-testid=show-password-label-login-form] input[type="checkbox"]').check();
      
        // Wait for the password input field to change its type attribute to "text"
        cy.get('[data-testid=password-input-login-form]').should($input => {
          expect($input).to.have.attr('type', 'text');
          expect($input).to.have.value('thePassword');
        });
      
        // Uncheck the "Show Password" checkbox
        cy.get('[data-testid=show-password-label-login-form] input[type="checkbox"]').uncheck();
      
        // Check if the password input field hides the password
        cy.get('[data-testid=password-input-login-form]').should('have.attr', 'type', 'password');
      });
      
      
});