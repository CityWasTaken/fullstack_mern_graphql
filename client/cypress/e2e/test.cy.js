import { faker } from '@faker-js/faker';

const username = faker.person.firstName() + faker.person.lastName();
const petName = faker.animal.cat();



function loginUser(cy) {
  cy.visit('/login');

  cy.get('input[name="email"]').type(username + '@testemail.com');

  cy.get('input[name="password"]').type('pass123');

  cy.get('form Button').click();
}

describe('Site Tests', () => {
  it('Should show the homepage hero', () => {
    cy.visit('/');

    cy.get('h1[data-hero-header]').contains('Petstagram');
  });

  it('Should be able to navigate to the register page', () => {
    cy.visit('/');

    cy.get('nav a[href="/register"]').click();

    cy.get('form h2').contains('Sign Up');
  });

  it('Should register a new user', () => {

    // Visit the register page
    cy.visit('/register');

    // Select the username input and type a fake name
    cy.get('input[name="username"]').type(username);

    // Select the email input and type a fake email
    cy.get('input[name="email"]').type(username + '@testemail.com')

    // Select the password input and type 'pass123'
    cy.get('input[name="password"]').type('pass123')

    // Select the Submit button and click it
    cy.get('form Button').click();

    // You should be able to select the header on the dashboard that contains
    cy.get('h3').contains('Your Lineup');
  });

  /* Create a test that does the following: 
    - Visit the login page
    - Fill out the email and passwoord inputs
    - Click the submit button
    - Test the 'Your Pets' header shows on the dashboard page
  */

  it('Should allow you to log in with an existing user account', () => {
    loginUser(cy);

    cy.get('h3').contains('Your Lineup');
  });

  // Logout test
  it('Should log the current user out', () => {
    loginUser(cy);

    cy.get('nav a').contains('Profile Menu').click();

    cy.get('nav a').contains('Logout').click();

    cy.get('nav').should('not.contain', 'Dashboard');

    cy.get('h1[data-hero-header]').contains('Petstagram');
  });

  // Create a pet
  it('Should be able to create a pet for the logged in user', () => {
    loginUser(cy);

    cy.get('nav a[href="/pet/add"]').click();

    cy.get('input[name="name"]').type(petName);

    cy.get('input[name="type"]').type('cat');

    cy.get('input[name="age"]').type(3);

    cy.get('form Button').click();

    // Check that the pet shows up on the dashboard
    cy.get('.pet-output').contains(petName);
  });

  // Create a post
  const postTitle = 'Post for ' + petName

  it('Should add a post for a pet', () => {
    loginUser(cy);

    cy.get('article').contains(petName).get('Button').first().click();

    cy.get('input[name="title"]').type(postTitle);

    cy.get('textarea[name="body"]').type('Meow I get to test it');

    cy.get('.modal-footer Button').last().click();

    cy.get('article').contains(petName).get('Button').contains('View Post').click();

    cy.get('.modal-body').contains(postTitle)

    cy.visit('/');

    cy.get('main').contains(postTitle);
  });

});