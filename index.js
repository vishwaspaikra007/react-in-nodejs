const express = require('express')
const app = express();

// const path = require('path')
// const cookieParser = require('cookie-parser')
const http = require('http')
const server = http.createServer(app)

const signup = require('./routes/signup')
const login = require('./routes/login')
const getUsers = require('./routes/getUsers')

const passport = require('./routes/passport')
require('./routes/customPassportAuthenticate')(passport)
const cors = require('cors')
app.use(cors(
    {origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://vishwaspaikra007.github.io'],
     credentials: true}
     ))
app.options('*', cors())  // enable pre-flight request for complex cors request for every route
app.use(express.json())

app.use(express.json())
app.use(passport.initialize())

app.use(signup)
app.use(login)
app.use(getUsers)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log("app is listening on port", PORT, " ", (new Date()).toString())
})