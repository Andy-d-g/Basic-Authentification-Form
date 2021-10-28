import express from 'express'
import Database from './database.js';
import cors from 'cors';
import helmet from 'helmet'
import rateLimit from 'express-rate-limit';

const PORT = 3000
const DB_NAME = 'database.json'
const DB_ENCODING = 'utf-8'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
  });

class Server {
    constructor (port) {
        this.port = port;
        this.app = express()
        this.init()
        this.listen(port)
        this.database = new Database(DB_NAME, DB_ENCODING)
    }
    
    router = () => {
        this.app.post('/', async (req, res) => {
            const email = encodeURI(req.body.email)
            const password = encodeURI(req.body.password)

            const checkInput = () => {
                let reg = [/^.{8,}$/ , /^(.*[A-Z].*)$/, /^(.*[a-z].*)$/, /^(.*\d.*)$/, /^(.*[!@#\$%\^&\*].*)$/]
                
                for (let i = 0; i < reg.length; i++) {
                    if (!reg[i].test(password)) {
                        return false;
                    } 
                }
                reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(String(email).toLowerCase())
            }

            let msg = 'Bad informations';

            if (checkInput()) {
                try {
                    const user = await this.database.getUser(email, password)
                    msg = this.database.verifyPassword(password, user.password)
                        ? 'Password : ok'
                        : 'Password : ko'
                } catch (err) {
                    this.database.addUser(email, password)
                    msg = 'Account created'
                }
            }
   
            res.json({response : msg})
        })
    }

    init = () => {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(helmet())
        this.app.use(limiter);
        this.router()
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        })
    }
    
}

new Server(PORT)