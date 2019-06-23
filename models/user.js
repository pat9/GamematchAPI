const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type:String, required:true},
    gametag:{type:String,required:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    birthday:{type:Date, required:true},
    correo:{type:String, required:false}
})

module.exports = mongoose.model('users', UserSchema);