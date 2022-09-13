/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('menu display correctly', () => {
  beforeEach(() => {
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.intercept('GET', 'https://api.npoint.io/8f7a5852d72e99542a52', sushiData).as('Sushi Data')
    })

    cy.visit('/')
  })

  it('shows the category', () => {
    cy.contains('All you can eat').click()
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).should('contain.text', sushiData[index].category.toUpperCase())
      })
    })
  })

  it('shows the menu type', () => {
    cy.contains('All you can eat').click()
    cy.get('[aria-label="menu-type"]').should('have.text', 'all you can eat')
    cy.contains('GO BACK TO MENU').click()
    cy.contains('A la carte').click()
    cy.get('[aria-label="menu-type"]').should('have.text', 'à la carte')
  })

  it('shows all items received', () => {
    cy.contains('All you can eat').click()
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        cy.get('[aria-label="items-grid"] [aria-label="order-item"]').each((orderItem, index) => {
          cy.wrap(orderItem).find('h3').should('have.text', categoryItems[index].name)
        })
      })
    })
  })
})
