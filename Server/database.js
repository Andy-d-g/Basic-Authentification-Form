import fs from 'fs'
import bcrypt from 'bcrypt'

class Database {
    constructor (db_name, db_encoding) {
        this.encoding = db_encoding
        this.name = db_name
        this.db = JSON.parse(fs.readFileSync(db_name, db_encoding))
    }

    addUser = async (email, password) => {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        this.db.accounts.push({
            email: email,
            password: hashPassword
        })
        fs.writeFileSync(this.name, JSON.stringify(this.db, null, 4), this.encoding)
        return {email: email, password: hashPassword}
    }

    getUser = (email) => {
        for (const account of this.db.accounts) {
            if (account.email === email) {
                return account;
            }
        }
        return undefined
    }

    verifyPassword = (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}

export default Database