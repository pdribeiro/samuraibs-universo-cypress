import loginPage from  '../support/pages/login'
import dashPage from  '../support/pages/dash'

describe('login', function (){

    context('quando o usuario é muito bom', function (){


        const user ={
            name: 'Jassa',
            email:'jassa@samuraibs.com',
            senha:'pwd123'
        } 

        it('deve logar com sucesso', function(){

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggeIn(user.name)
        })

    })

})