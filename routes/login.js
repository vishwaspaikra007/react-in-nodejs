const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const signJWT = require('./jwt')
const dotenv = require('dotenv')

dotenv.config()
var signupModel = require('../database/signupModel');

  

router.post('/login', (req, res) => {
    // console.log("req.body", req.body)
    signupModel.findOne({email: req.body.email}).select('+password')
        .then(user => {
            // console.log(user)
            if(user){ 
                bcrypt.compare(req.body.password, user.password, (err, result)=> {
                    if(result)
                     {
                        let payloadData = {}

                        const signedJWT = signJWT({id:user.email, payloadData: payloadData})
                        res.send({logedin: true, msg:"login successfull", signedJWT, name: user.firstName + " " + user.lastName})
                    }
                    else
                    {
                        console.log("wrong password")
                        res.send({logedin: false, msg:"login unsuccessfull"})
                    }
                })
            } else {
                console.log("no user with this email")
                res.send({logedin: false, msg:"login unsuccessfull check your email"})
            }
        }).catch(err => {
            res.send({logedin: false, msg:"login unsuccessfull database error"})
        })
})

module.exports = router