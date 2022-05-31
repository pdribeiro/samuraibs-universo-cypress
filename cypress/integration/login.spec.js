import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('quando o usuario é muito bom', function () {


        const user = {
            name: 'Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)

        })

        it('deve logar com sucesso', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggeIn(user.name)
        })

    })

    context.only('quando o usuario é muito bom mas a senha é ruim', function () {


        let user = {
            name: 'Celso Kamura',
            email: 'kamuraa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })

        })

        it('deve notificar erro de credencial', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)

        })

    })



})