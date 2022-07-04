describe('basic', () => {
  // beforeEach(() => {
  //   cy.visit('/')
  // })

  it('home', () => {
    cy.visit('/')
    cy.url()
      .should('eq', 'http://localhost:4173/')
  })

  it('viewer', () => {
    cy.visit('/viewer.html')
    cy.url()
      .should('eq', 'http://localhost:4173/viewer.html')

    cy.get('button#fitView').click()
    cy.screenshot('bpmn')
  })

  it('modeler', () => {
    cy.visit('/modeler.html')
    cy.url()
      .should('eq', 'http://localhost:4173/modeler.html')

    cy.get('button#fitView').click()
    cy.screenshot('modeler')

    cy.get('button#export').click()
    cy.get('li[data-menu-id="json"]').click()

    cy.get('button#export').click()
    cy.get('li[data-menu-id="png"]').click()
  })

  it('NodeRed', () => {
    cy.visit('/modeler.html?modelType=nodeRed')
    cy.url()
      .should('eq', 'http://localhost:4173/modeler.html?modelType=nodeRed')

    cy.get('button#fitView').click()
    cy.screenshot('nodeRed')

    cy.get('button#export').click()
    cy.get('li[data-menu-id="json"]').click()

    cy.get('button#export').click()
    cy.get('li[data-menu-id="png"]').click()
  })
})

export { }
