const express = require('express')
const cors = require('cors')
const fs = require('fs')
const PORT = 3000

class Server {
    constructor (port) {
        this.port = port;
        this.app = express()
        this.init()
        this.listen(port)
    }
    
    router = () => {
        this.app.post('/', (req, res) => {
            const databaseName = 'database.json'
            const databaseEncoding = 'utf-8'
            const email = req.body.email
            const password = req.body.password
            const database = JSON.parse(fs.readFileSync(databaseName, databaseEncoding))

            const verifyData = (mail, pwd) => {
                let reg = [/^.{8,}$/ , /^(.*[A-Z].*)$/, /^(.*[a-z].*)$/, /^(.*\d.*)$/, /^(.*[!@#\$%\^&\*].*)$/]
                
                for (let i = 0; i < reg.length; i++) {
                    if (!reg[i].test(pwd)) {
                        return false;
                    } 
                }
                reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(String(mail).toLowerCase())
            }

            let msg = 'Les informations fournis ne sont pas correct'

            if (verifyData(email, password)) {
                for (const account of database.accounts) {
                    if (account.email === email) {
                        if (account.password === password) msg = 'Good password'
                        else msg = 'Bad password'
                    } else msg = 'The account does\'t exist : creation done'
                }
    
                if (msg === 'The account does\'t exist : creation done') {
                    database.accounts.push({
                        email: email,
                        password: password
                    })
                    fs.writeFileSync(databaseName, JSON.stringify(database, null, 4), databaseEncoding)
                }     
            }
            
   
            res.json({response : msg})
        })
    }

    init = () => {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.router()
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        })
    }
    
}

new Server(PORT)