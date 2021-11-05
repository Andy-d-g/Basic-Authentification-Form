import fs from 'fs'
import bcrypt from 'bcryptjs'

class Database {
    constructor (db_name, db_encoding) {
        this.encoding = db_encoding
        this.name = db_name
        this.db = JSON.parse(fs.readFileSync(db_name, db_encoding))
    }

    addUser = async (email, password) => {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        const hashEmail = await bcrypt.hash(email, salt)
        this.db.accounts.push({
            email: hashEmail,
            password: hashPassword
        })
        fs.writeFileSync(this.name, JSON.stringify(this.db, null, 4), this.encoding)
        return {email: hashEmail, password: hashPassword}
    }

    getUser = (email) => {
        for (const account of this.db.accounts) {
            if (bcrypt.compareSync(email, account.email)) {
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