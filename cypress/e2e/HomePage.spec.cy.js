describe('Homepage, user logged in using login btn in the Hero component in the homepage', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  

  // User hits on the login button in the Hero component in the homepage
  it('should check if the login button is visible and click on it', () => {
    // Check if the login button is visible
    cy.get('[data-testid="login-button-hero"]').should('be.visible');

    // Click on the login button
    cy.get('[data-testid="login-button-hero"]').click();

    // After clicking the login button, user should be relocated to the login page
    cy.url().should('include', '/auth/login');
  });

  //  User fills in the login form to submit form
  it('should fill in the login form and submit form', () => {
    // Visit the login page
    cy.visit('/auth/login');

    // Check if the login form is visible
    cy.get('form').should('be.visible');

    // Fill in the email input field
    cy.get('input[name="email"]').type('annadehamburg@gmail.com');

    // Fill in the password input field
    cy.get('input[name="password"]').type('Yxcvbnm1');

    // Submit the form
    cy.get('form').submit();

    // After submitting the form, the user should be relocated to the home page
    cy.url().should('include', '/');
  });


});



