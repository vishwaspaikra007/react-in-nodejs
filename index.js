const express = require('express')
const app = express();

const path = require('path')
// const cookieParser = require('cookie-parser')
const http = require('http')
const server = http.createServer(app)

const signup = require('./routes/signup')
const login = require('./routes/login')
const getUsers = require('./routes/getUsers')

const passport = require('./routes/passport')
require('./routes/customPassportAuthenticate')(passport)
const cors = require('cors')
// app.use(cors())
app.use(cors(
    {origin: [
    'http://127.0.0.1:3000', 
    'http://127.0.0.1:5000', 
    'http://localhost:3000', 
    'http://localhost:5000', 
    'https://vishwaspaikra007.github.io', 
    'https://adrixus-fronend.web.app',
    'https://adrixus-fronend.firebaseapp.com'],
     credentials: true}
     ))
app.options('*', cors())  // enable pre-flight request for complex cors request for every route
app.use(express.json())

app.use(express.json())
app.use(passport.initialize())

app.use(signup)
app.use(login)
app.use(getUsers)

app.use(express.static(path.join(__dirname, "./client/build")))
app.get("/", (req, res) => {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html")
    );
});
app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html")
    );
});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log("app is listening on port", PORT, " ", (new Date()).toString())
})