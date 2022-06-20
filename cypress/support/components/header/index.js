import{el} from './elements'
class Header {
    userLoggeIn(userName) {
        cy.get(el.fullName, { timeout: 17000 })
            .should('be.visible')
            .should('have.text', userName)
    }

}

export default new Header()