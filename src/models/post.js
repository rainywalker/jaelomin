const mongoose = require('mongoose');
const {Schema} = mongoose;

const Author = new Schema({
    name : String,
    email : String
});

const Post = new Schema({
    title : String,
    authors : [Author],
    tags : [String],
    desc : String,
    createAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Post', Post)
