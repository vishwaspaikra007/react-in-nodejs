const express = require('express')
const router = express.Router()
const allUser = require('../database/config')
const signup = require('../database/signupModel')

router.get('/getusers',(req, res, next)=> customPassportAuthenticate(req, res, next), (req, res) => {
    // console.log(allUser)
    if(!req.user) {
        res.send({status: 'unsuccessfull', msg: "Token Expired"})
        return 
    }
    signup.find({}, {password: 0}).then(user => {
        // console.log(user)
        let users = [...allUser, ...user]
        res.send({status: 'successfull', list: users})
    }).catch(err => {
        console.log(err)
        res.send({status: 'unsuccessfull', msg: "something went wrong"})
    })
})

module.exports = router