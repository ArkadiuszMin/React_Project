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
        console.log(user)
        if(!user) return res.send({status: "ERROR", err: "INTERNAL_ERROR"})
        return res.send({status: "OK", user: user})
    })
    


})

let getUser = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT id, username, email FROM users WHERE id = ${id}`, (err, res) => {
            if(err || res.length==0){
                return resolve(null)
            } 
            return resolve(res[0])
        })
    })
}



module.exports = router