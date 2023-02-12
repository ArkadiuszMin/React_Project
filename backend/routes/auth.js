const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")

let sql = require('../db.js');

router.post("/login", async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({ status: "FAILED", err: "MISSING_INFORMATION"})
    }
    
    let user = await getUserByEmail(req.body.email)
    if(user == null){
        return res.status(400).send({ status: "FAILED", err: "INVALID_LOGIN"})
    }
    bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if(isValid){
            console.log("VALID")
            return res.status(200).send({ status: "OK"})

        }
        else{
            console.log("ERROR")
            return res.status(400).send({ status: "FAILED", err: "INVALID_LOGIN"})
        }
    })
})

router.post("/register", (req, res) => {
    if(!(req.body.email && req.body.password && req.body.username && req.body.repeatPassword)){
        return res.status(400).send({ status: "FAILED", err: "MISSING_INFORMATION"})
    }
    if(req.body.password != req.body.repeatPassword){
        return res.status(400).send({ status: "FAILED", err: "PASSWORDS_DON'T_MATCH"})
    }

    let {username, password, email, ...body} = req.body;

    bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(req.body.password, salt)
    }).then(async (hash) => {
        let exists = await checkIfExists(username, email)
        if(exists){
            return res.send({ status: "FAILED", err: "USER_EXISTS"})
        }
        sql.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hash}')`, (err, sqlres) => {
            if (err) return res.status(400).send({ status: "FAILED", err: "INTERNAL_ERROR"})
            return res.status(200).send({ status: "OK"})
        })
        return res.status(200).send({ status: "OK"})

    }).catch((err) => {
        return res.status(500).send( { status: "SERVER_ERROR", err: "ENCRYPTION_ERROR"})
    })
    

})

let checkIfExists = (username, email) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`, (err, res) => {
            if(err){
                return resolve(true)
            } 
            if(res.length>0){
                return resolve(true)
            }
            return resolve(false) 
        })
    })
}

let getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
            if (err || res.length==0) return resolve(null)
            return resolve(res[0])
        })
    })
}

module.exports = router