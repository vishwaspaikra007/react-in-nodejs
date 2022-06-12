const mongoose = require('./mongo.config')
let schema = mongoose.Schema

const signupSchema = new schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timeStamps: true})
signupSchema.index({createdAt: 1})
const signup = mongoose.model('signup', signupSchema)
module.exports = signup