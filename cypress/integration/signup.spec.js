import signuPage from "../support/pages/signup"; '../suport/pages/signup'

describe('Cadastro', function () {

    before(function(){

        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })

    })


    context('quando o usuario é novato', function () {

 //       const user = {
 //           name: 'Pedro Franco Ribeiro',
 //           email: 'pedro.r.franco94@gmail.com',
 //           password: 'pwd123'

//        }

        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuarios ', function () {
            signuPage.go()
            signuPage.form(this.success)
            signuPage.submit()
            signuPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

    })

    context('quando o email já existe ', function () {


        before(function () {

            cy.postUser(this.email_dup)

        })
        it('Não deve cadastrar o usuario ', function () {
            signuPage.go()
            signuPage.form(this.email_dup)
            signuPage.submit()
            signuPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })

    })

    context('quando o email é incorreto', function () {



        it('deve exibir mensagem de alerta', function () {

            signuPage.go()
            signuPage.form(this.email_inv)
            signuPage.submit()
            signuPage.alert.HaveText('Informe um email válido')

        })

    })

    context('quando a senha tem menos de 6 caractere', function () {

        const passwords = ['1', '12', '123', '1234', '12345']

        beforeEach(function () {
            signuPage.go()

        })
        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha ' + p, function () {

                this.short_password.password = p

                signuPage.form(this.short_password)
                signuPage.submit()
            })
        })

        afterEach(() => {
            signuPage.alert.HaveText('Pelo menos 6 caracteres')
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
                signuPage.alert.HaveText(alert)

            })

        })

    })
})
