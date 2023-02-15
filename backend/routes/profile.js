const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

let sql = require('../db.js');


router.get("/check", (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.send({ status: "FAILED", err:"UNAUTHORIZED_ACCESS"})
    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err || !decoded.id) return res.send({status: "FAILED", err:"UNAUTHORIZED_ACCESS"})
        let user = await getUser(decoded.id);
        if(!user) return res.send({status: "ERROR", err: "INTERNAL_ERROR"})
        return res.send({status: "OK", user: user})
    })
})

let getUser = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT id, username, email, place FROM users WHERE id = ${id}`, (err, res) => {
            if(err || res.length==0){
                return resolve(null)
            } 
            return resolve(res[0])
        })
    })
}


router.post(`/changeplace`, (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err || !decoded.id) return res.send({ status:"ERROR", err:"UNAUTHORIZED_ACCESS"})
        let status = await changePlace(decoded.id, req.body.place)
        if(!status) return res.send({status: "ERROR", err:"INTERNAL_ERROR"})
        return res.send({status: "OK"})
    })
})

let changePlace = (id ,place) => {
    return new Promise((resolve, reject) => {
        console.log(id)
        console.log(place)
        sql.query(`UPDATE users SET place = '${place}' WHERE id = '${id}'`, (err, res) => {
            if(err) return resolve(false)
            return resolve(true)
        })
    })
    
}

router.post("/changepassword", (req, res) => {

    if(!(req.body.password && req.body.newpassword && req.body.repnewpassword)) return res.send({ status: "FAILED", err: "MISSING_INFORMATION"})
    let {password, newpassword, repnewpassword, ...body} = req.body
    
    if(newpassword != repnewpassword) return res.send({ status:"FAILED", err:"PASSWORDS_DON'T_MATCH"})
    let token = req.headers.authorization.split(" ")[1]
    if(!token) return res.send({ status: "FAILED", err: "UNAUTHORIZED_ACCESS"})
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err || !decoded.id) return res.send({ status: "ERROR", err:"UNAUTHORIZED_ACCESS"})
        let isChanged = await changePassword(password, newpassword, decoded.id)
        if(!isChanged) return res.send({ status: "FAILED", err:"SQL_ERROR"})
        return res.send({ status: "OK"})
    })
})

let changePassword = (password, newpassword, id) => {
    let returnUsersPassword = () => {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT password FROM users WHERE id = '${id}'`, (err, res) => {
                if(err || res.length != 1) return resolve(null)
                return resolve(res[0])
            }) 
        })
    }

    return new Promise(async (resolve, reject) => {
        let actuallpassword = await returnUsersPassword()
        if(actuallpassword == null) return resolve(false)
        actuallpassword = actuallpassword.password
        bcrypt.compare(password, actuallpassword, (err, isValid) => {
            if(err || !isValid) return resolve(false)
            bcrypt.genSalt(10).then((salt) => {
                return bcrypt.hash(newpassword, salt)
            }).then((hash) => {
                sql.query(`UPDATE users SET password = '${hash}' WHERE id = '${id}'`, (err, res) => {
                    if(err) return resolve(false)
                    return resolve(true)
                })
            })
        })
    })
}

module.exports = router