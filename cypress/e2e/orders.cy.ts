/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('handle AYCE orders', () => {
  beforeEach(() => {
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.intercept('GET', 'https://api.npoint.io/8f7a5852d72e99542a52', sushiData).as('Sushi Data')
    })

    cy.visit('/')
    cy.contains('All you can eat').click()
  })

  it('shows prices correctly', () => {
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        cy.get('[aria-label="items-grid"] [aria-label="order-item"]').each((orderItem, index) => {
          cy.wrap(orderItem)
            .find('[aria-label="item-price"]')
            .should(
              'have.text',
              categoryItems[index].included ? '0.00€' : categoryItems[index].price.toFixed(2) + '€',
            )
        })
      })
    })
  })

  it('add item price correctly', () => {
    cy.fixture('sushipressdata').then((sushiData) => {
      let totalPrice = 24.99

      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        cy.get('[aria-label="items-grid"] [aria-label="order-item"]').each((orderItem, index) => {
          cy.wrap(orderItem).contains('ADD TO CART').click()
          totalPrice += categoryItems[index].included ? 0 : categoryItems[index].price
          cy.get('#cart-price').should('have.value', `${totalPrice.toFixed(2)}€`)
        })
      })
    })
  })

  it('add quantity item price correctly', () => {
    cy.fixture('sushipressdata').then((sushiData) => {
      let totalPrice = 24.99

      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        let orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
        let addQuantityButton = orderItem.find('[aria-label="add"]')

        addQuantityButton.click()
        addQuantityButton.click()

        orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
        orderItem.find('#counter-input').should('have.value', 3)

        orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
        orderItem.contains('ADD TO CART').click()

        totalPrice += (categoryItems[0].included ? 0 : categoryItems[0].price) * 3
        cy.get('#cart-price').should('have.value', `${totalPrice.toFixed(2)}€`)
      })
    })
  })

  it('remove item correctly', () => {
    let orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
    let itemPrice = orderItem.find('[aria-label="item-price"]')
    //let orderItem = cy.get('[aria-label="items-list"] [aria-label="cart-item"]').first();
    //let removeItemButton = orderItem.find('[aria-label="delete"]');

    //removeItemButton.click();
  })
})

describe('handle A LA CARTE orders', () => {
  beforeEach(() => {
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.intercept('GET', 'https://api.npoint.io/8f7a5852d72e99542a52', sushiData).as('Sushi Data')
    })

    cy.visit('/')
    cy.contains('A la carte').click()
  })

  it('shows prices correctly', () => {
    cy.fixture('sushipressdata').then((sushiData) => {
      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        cy.get('[aria-label="items-grid"] [aria-label="order-item"]').each((orderItem, index) => {
          cy.wrap(orderItem)
            .find('[aria-label="item-price"]')
            .should('have.text', categoryItems[index].price.toFixed(2) + '€')
        })
      })
    })
  })

  it('add item price correctly', () => {
    cy.fixture('sushipressdata').then((sushiData) => {
      let totalPrice = 2.5

      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        cy.get('[aria-label="items-grid"] [aria-label="order-item"]').each((orderItem, index) => {
          cy.wrap(orderItem).contains('ADD TO CART').click()
          totalPrice += categoryItems[index].price
          cy.get('#cart-price').should('have.value', `${totalPrice.toFixed(2)}€`)
        })
      })
    })
  })

  it('add quantity item price correctly', () => {
    cy.fixture('sushipressdata').then((sushiData) => {
      let totalPrice = 2.5

      cy.get('ul[aria-label="category-list"] > li').each((categoryItem, index) => {
        cy.wrap(categoryItem).find('button').click()
        const categoryItems = sushiData[index].items

        let orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
        let addQuantityButton = orderItem.find('[aria-label="add"]')

        addQuantityButton.click()
        addQuantityButton.click()

        orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
        orderItem.find('#counter-input').should('have.value', 3)

        orderItem = cy.get('[aria-label="items-grid"] [aria-label="order-item"]').first()
        orderItem.contains('ADD TO CART').click()

        totalPrice += categoryItems[0].price * 3
        cy.get('#cart-price').should('have.value', `${totalPrice.toFixed(2)}€`)
      })
    })
  })

  it('remove item correctly', () => {
    let totalPrice = 2.5
    cy.get('[aria-label="items-grid"] [aria-label="order-item"]')
      .first()
      .find('[aria-label="item-price"]')
      .then(($el) => {
        let priceNumber = parseFloat($el.text().replace('€', ''))
        cy.wrap($el).parentsUntil('[aria-label="items-grid"]').contains('ADD TO CART').click()
        cy.get('[aria-label="cart"]').click()
        //verifica che il prezzo sia aumentato di priceNumber euri
        cy.get('#counter-input').should('have.value', `${(totalPrice + priceNumber).toFixed(2)}€`)
        let orderItem = cy.get('[aria-label="items-list"] [aria-label="cart-item"]').first()
        let removeItemButton = orderItem.find('[aria-label="delete"]')
        removeItemButton.click()
        cy.get('#cart-price').should('have.value', `${totalPrice.toFixed(2)}€`)
      })

    //removeItemButton.click();
  })
})
