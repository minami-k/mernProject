const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Session = new Schema({
    refreshToken: {
        type: String,
        default: ''
    }
})

const User = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    authStrategy: {
        type: String,
        default: 'local'
    },
    refreshToken: {
        type: [Session]
    },
    points: {
        type: Number,
        default: 50
    }
})

//remove refreshtoken from the response
User.set("toJSON", {
    transform: function(doc, ret, options){
        delete ret.refreshToken
        return ret
    }
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)