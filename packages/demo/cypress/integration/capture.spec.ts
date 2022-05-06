export default describe('Screen Capture', () => {

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
    cy.screenshot()
  })

  it('modeler', () => {
    cy.visit('/modeler.html')
    cy.url()
      .should('eq', 'http://localhost:4173/modeler.html')
    cy.screenshot()
  })

})
