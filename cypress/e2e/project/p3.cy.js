/// <reference types ="cypress" />

import Project03Page from "../../pages/Project03Page"

describe('Project 3', () => {
  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/project-3')
  })
  const project03Page = new Project03Page()
  /**
  * Navigate to https://techglobal-training.com/frontend/project-3
  * Validate that the “One way” radio button is displayed enabled and selected by default
  * Validate that the “Round trip” radio button is displayed enabled and not selected by default
  * Validate that the “Cabin Class” label and dropdown are displayed
  * Validate that the “From” label and dropdown are displayed
  * Validate that the “To” label and dropdown are displayed
  * Validate that the “Depart” label and date picker is displayed
  * Validate that the “Return” label and date picker is displayed and disabled
  * Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
  * Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default
  * Validate that the “BOOK” button is displayed and enabled
  */

  it('Validate the default Book your trip form', () => {
    project03Page.getTripTypeRadioButtonsByLabel('One way')
    .should('be.visible')
    .and('be.enabled')
    .and('be.checked')

    project03Page.getTripTypeRadioButtonsByLabel('Round trip')
    .should('be.visible')
    .and('be.enabled')
    .and('not.be.checked')

    project03Page.getAllLabel().should('be.visible')

    project03Page.getAllDropdowns().each($el => {
      cy.wrap($el).should('be.visible')
    })

    project03Page.getAllDatePickers().each($el => {
      cy.wrap($el).should('be.visible')
    })

    project03Page.getDropdownByLabel('Number of passengers')
    .should('have.value', '1')

    project03Page.getDropdownByLabel('Passenger 1')
    .should('have.value', 'Adult (16-64)')

    project03Page.getBookButton().should('be.visible').and('be.enabled')
  })

  it('Test Case 3', () => {

    project03Page.selectTripType('One way')

    const dropdownOptions = {
      cabinClass: "Business",
      from: "Illinois",
      to: "Florida",
      numberOfPassengers: "1",
      passengerOne: "Senior (65+)"
    }

    project03Page.fillDropdowns(dropdownOptions)

    const futureDateStr = project03Page.getFutureDateByDays(7)

    project03Page.getDatePickerByLabel('Depart')
    .clear()
    .type(`${futureDateStr} {enter}`)

    project03Page.clickBookButton()


    const futureDateBookingFormat = project03Page.getFormattedDateForBooking(futureDateStr)

    const departureAbbreviation = project03Page.getAbbreviationForState(dropdownOptions.from)
    const destinationAbbreviation = project03Page.getAbbreviationForState(dropdownOptions.to)

    const inf = [
      'DEPART',
       `${departureAbbreviation} to ${destinationAbbreviation}`,
        futureDateBookingFormat
      ]

    project03Page.getTravelInfoDepart().each(($el, index) => {
      cy.wrap($el).should('have.text', inf[index])
    })

    const expectedTexts = project03Page.formatDropdownOptionsToBookingText(dropdownOptions)

    project03Page.getPassengerInfo().each(($el, index) => {
      cy.wrap($el).should('have.text', expectedTexts[index])
    })
  })
it('Test Case 4', () => {
  project03Page.selectTripType('Round trip')


  const dropdownOptions = {
    cabinClass: "Business",
    from: "California",
    to: "Illinois",
    numberOfPassengers: "1",
    passengerOne: "Senior (65+)"
  }

  project03Page.fillDropdowns(dropdownOptions)

  const departDate = project03Page.getFutureDateByDays(7)
  const returnDate = project03Page.getFutureDateByDays(30)

  project03Page.getDatePickerByLabel('Depart')
  .clear().type(`${departDate} {enter}`)

  project03Page.getDatePickerByLabel('Return')
  .clear().type(`${returnDate} {enter}`)

  project03Page.clickBookButton()

  const departAbbreviation = project03Page.getAbbreviationForState(
    dropdownOptions.from
  )
  const returnAbbreviation = project03Page.getAbbreviationForState(
    dropdownOptions.to
  )

  const departBookingFormat = 
  project03Page.getFormattedDateForBooking(departDate)

  const returnDateBookingFormat = 
  project03Page.getFormattedDateForBooking(returnDate)

  
  const departInf = [
    'DEPART',
     `${departAbbreviation} to ${returnAbbreviation}`,
     departBookingFormat
    ]
cy.log(departInf)
    project03Page.getTravelInfoDepart().each(($el, index) => {
      cy.wrap($el).should('have.text', departInf[index])
    })

  const returnInf = [
     'RETURN', 
     `${returnAbbreviation} to ${departAbbreviation}`, 
     returnDateBookingFormat
    ]


    project03Page.getTravelInfoReturn().each(($el, index) => {
      cy.wrap($el).should('have.text', returnInf[index])
    })
    const expectedTexts = project03Page.formatDropdownOptionsToBookingText(dropdownOptions)

    project03Page.getPassengerInfo().each(($el, index) => {
      cy.wrap($el).should('have.text', expectedTexts[index])
    })
    
})

it.only('Test Case 5', () => {
  project03Page.selectTripType('One way')

  const dropdownOptions = {
    cabinClass: "Premium Economy",
    from: "New York",
    to: "Texas",
    numberOfPassengers: "2",
    passengerOne: "Adult (16-64)",
    passengerTwo: "Child (2-11)"
  }

project03Page.fillDropdowns(dropdownOptions)

const departDate = project03Page.getFutureDateByDays(1)

project03Page.getDatePickerByLabel('Depart')
.clear()
.type(`${departDate} {enter}`)

project03Page.clickBookButton()

const departAbbreviation = project03Page.getAbbreviationForState(dropdownOptions.from)
const destinationAbbreviation = project03Page.getAbbreviationForState(dropdownOptions.to)

const departBookingFormat = project03Page.getFormattedDateForBooking(departDate)

const departInf = [
  'DEPART',
   `${departAbbreviation} to ${destinationAbbreviation}`,
   departBookingFormat
  ]

  project03Page.getTravelInfoDepart().each(($el, index) => {
    cy.wrap($el).should('have.text', departInf[index])
  })

  const expectedTexts = project03Page.formatDropdownOptionsToBookingText(dropdownOptions)

  project03Page.getPassengerInfo().each(($el, index) => {
    cy.wrap($el).should('have.text', expectedTexts[index])
  })
})



  
})


