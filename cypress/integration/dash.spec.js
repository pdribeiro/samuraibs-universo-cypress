import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import dash from '../support/pages/dash'

import { customer, provider, appointment } from '../support/factories/dash'




describe('dashboard', function () {

    context('quando o cliente faz um agendamento no app mobile', function () {


        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)

        })

        it(' o mesmo deve ser exibido no dashboard', function () {
            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()
            dashPage.calendarShouldBeVisible()
            const day = Cypress.env('appointmentDay')
            dashPage.selecDay(day)

            dash.appointmentShouldBe(customer,appointment.hour)

        })
    })

})

