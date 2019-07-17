const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type:String, required:false},
    gametag:{type:String,required:false},
    password:{type:String, required:false},
    name:{type:String, required:false},
    birthday:{type:Date, required:false},
    correo:{type:String, required:false},
    profilepic:{type:Object, required:false},
    isSocialLogin:{type:Boolean, required:false},
    socialMethod:{type:String, required:false},
    idSocial:{type:String, required:false},
    description:{type:String, required:false},
    facebookLink:{type:String, required:false},
    twitterLink:{type:String, required:false},
    twitchLink:{type:String, required:false}
})

module.exports = mongoose.model('users', UserSchema);