const express = require('express')
const router = express.Router()
const signupModel = require('../database/signupModel')
const bcrypt = require('bcrypt')
const signJWT = require('./jwt')
const dotenv = require('dotenv')

dotenv.config()

router.post('/signup', (re, res) => {
    console.log(re.body)
    signupModel.findOne({email: re.body.email}).then(user => {
        console.log(user)
        if(user)
            res.send({signedup: false, msg: 'user already signedup'})
        else {
            console.log('user doesnt exist')
            bcrypt.hash(re.body.password, 10, (err, hash) => {
                if(err) console.log(err)
                signupModel.create({
                    firstName: re.body.firstName,
                    lastName: re.body.lastName,
                    email: re.body.email,
                    password: hash,
                }).then(user => {
                    let payloadData = {}
                    const signedJWT = signJWT({id:user.email, payloadData: payloadData})
                    res.send({signedup: true, msg: 'signup successfull', signedJWT,  name: user.firstName + " " + user.lastName})
                }).catch(err => {
                    res.send({signedup: false, msg: 'signup unsuccessfull'})
                })
            })
        }
    })
})

module.exports = router