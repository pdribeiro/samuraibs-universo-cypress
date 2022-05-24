import signuPage from "../support/pages/signup"; '../suport/pages/signup'

describe('Cadastro', function () {

    context('quando o usuario é novato', function () {

        const user = {
            name: 'Pedro Franco Ribeiro',
            email: 'pedro.r.franco94@gmail.com',
            password: 'pwd123'

        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuarios ', function () {
            signuPage.go()
            signuPage.form(user)
            signuPage.submit()
            signuPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

    })

    context('quando o email já existe ', function () {

        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true

        }
        before(function () {

            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

        })
        it('Não deve cadastrar o usuario ', function () {
            signuPage.go()
            signuPage.form(user)
            signuPage.submit()
            signuPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })

    })

    context('quando o email é incorreto', function () {

        const user = {
            name: 'Elizabet Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'

        }

        it('deve exibir mensagem de alerta', function () {

            signuPage.go()
            signuPage.form(user)
            signuPage.submit()
            signuPage.alertHaveText('Informe um email válido')

        })

    })

    context('quando a senha tem menos de 6 caractere', function () {

        const passwords = ['1', '12', '123', '1234', '12345']

        beforeEach(function () {
            signuPage.go()

        })
        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha ' + p, function () {

                const user = {
                    name: 'Jason Friday', email: 'jason@gmail.com', password: p
                }

                signuPage.form(user)
                signuPage.submit()
            })
        })

        afterEach(() => {
            signuPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [

            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória',
        ]

        before(function () {
            signuPage.go()
            signuPage.submit()

        })

        alertMessages.forEach(function (alert) {

            it('deve exibir ' + alert.toLocaleLowerCase(), function () {
                signuPage.alertHaveText(alert)

            })

        })

    })
})
