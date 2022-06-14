import fpPage from '../support/pages/forgotpass'

describe('resgate de sebga ', function () {

    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.date = recovery
        })
    });

    context('quando o usuario esquece a senha', function () {

        before(function () {
            cy.postUser(this.date)
        })

        it('deve poder resgatar por email', function () {
            fpPage.go()
            fpPage.form(this.date.email)
            fpPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

            fpPage.toast.shouldHaveText(message)

        })

    })

    context.only('quando o usuario solicita o resgate ', function () {
        before(function () {
            cy.postUser(this.date)
            cy.recoveryPass(this.date.email)

        })

        it('deve poder cadastrar uma nova senha ', function () {

            console.log(Cypress.env('recoveryToken'))



        })

    })

});