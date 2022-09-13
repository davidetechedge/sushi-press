/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('can change people', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('set 1 people by default', () => {
    cy.get('#counter-input').should('have.value', 1)
  })

  it('add people', () => {
    cy.get('button[aria-label="add"]').click()
    cy.get('button[aria-label="add"]').click()
    cy.get('button[aria-label="add"]').click()
    cy.get('#counter-input').should('have.value', 4)
  })

  it('remove people', () => {
    cy.get('button[aria-label="add"]').click()
    cy.get('button[aria-label="add"]').click()
    cy.get('button[aria-label="remove"]').click()
    cy.get('#counter-input').should('have.value', 2)
  })

  it('cannot have less than 1 people', () => {
    cy.get('button[aria-label="remove"]').click()
    cy.get('#counter-input').should('have.value', 1)
  })
})

describe('set price correctly', () => {
  const AYCEPrice = 24.99
  const ALACARTEPrice = 2.5

  beforeEach(() => {
    cy.visit('/')
  })

  afterEach(() => {
    cy.contains('GO BACK TO MENU').click()
  })

  it('AYCE set price per person', () => {
    cy.contains('All you can eat').click()
    cy.get('#cart-price').should('have.value', `${AYCEPrice.toFixed(2)}€`)
  })

  it('AYCE set correct price base on people', () => {
    cy.get('button[aria-label="add"]').click()
    cy.get('button[aria-label="add"]').click()
    cy.get('#counter-input').should('have.value', 3)

    cy.contains('All you can eat').click()
    cy.get('#cart-price').should('have.value', `${(AYCEPrice * 3).toFixed(2)}€`)
  })

  it('A LA CARTE set price per person', () => {
    cy.contains('A la carte').click()
    cy.get('#cart-price').should('have.value', `${ALACARTEPrice.toFixed(2)}€`)
  })

  it('A LA CARTE set correct price base on people', () => {
    cy.get('button[aria-label="add"]').click()
    cy.get('button[aria-label="add"]').click()
    cy.get('#counter-input').should('have.value', 3)

    cy.contains('A la carte').click()
    cy.get('#cart-price').should('have.value', `${(ALACARTEPrice * 3).toFixed(2)}€`)
  })
})
