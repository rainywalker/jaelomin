const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto');

function hash (pw) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(pw).digest('hex')
}

const Auth = new Schema({
    profile : {
        username : String
    },
    email : {
        type : String
    },
    social : {
        facebook : {
            id : String,
            accessToken : String
        },
        google : {
            id : String,
            accessToken : String
        }
    },
    password : String,
    postCount : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})


module.exports = mongoose.model('Auth', Auth);
