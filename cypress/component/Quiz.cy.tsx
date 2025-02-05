import React from 'react'
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "/api/questions/random"
    },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
    )
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />)
  });

  it('mounts and displays the "start quiz" button', () => {
    cy.mount(<Quiz />);

    cy.get('button').contains('Start Quiz').should("be.visible");
  });


  it('should display the first question when the "start quiz" button is clicked', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    cy.get('h2').contains("What is the correct answer?").should("be.visible");
  });

  it('shows a loading message when the array of question objects is empty', () => {
    cy.intercept({
      method: "GET",
      url: "/api/questions/random"
    },
      {
        fixture: 'emptyquestions.json',
        statusCode: 200
      }
    )
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('span').contains("Loading...").should("be.visible");
  });
});

