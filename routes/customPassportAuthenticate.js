module.exports = (passport) => {
    customPassportAuthenticate = (req, res, next)=> {
        console.log("Custom Passport Auth called")
        passport.authenticate('jwt', (err, user, info) => {
            if(err) res.send(err)
            if(user){ 
                req.user = user
                next()
            } else {
                req.user = null
                next()
            }
        })(req, res, next)
    }
}