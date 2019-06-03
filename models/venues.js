const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name:{type:String, required:true},
    profilepic:{type:String, required:true},
    lat:{type:Number, required:true},
    long:{type:Number, required:true},
    phone:{type:String, required:true},
})

module.exports = mongoose.model('venues', venueSchema);
