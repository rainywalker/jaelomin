const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto');
const {generateToken} = require('lib/token');

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

Auth.statics.findByUserName = function(username) {
    return this.findOne({
        'profile.username' : username
    }).exec();
};

Auth.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Auth.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Auth.statics.localRegister = function({ username, email, password }) {

    const account = new this({
        profile: {
            username
        },
        email,
        password: hash(password)
    });

    return account.save();
};

Auth.methods.validatePassword = function(password){
    const hashed = hash(password);
    return this.password === hashed;
};

Auth.methods.generateToken = function() {
    // JWT 에 담을 내용
    const payload = {
        _id: this._id,
        profile: this.profile
    };

    return generateToken(payload, 'account');
};

module.exports = mongoose.model('Auth', Auth);
