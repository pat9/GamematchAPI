const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name:{type:String, required:true},
    profilepic:{type:String, required:true},
    loc:{      
        type:{type:String, required:true, default:"Point"},
        coordinates:[{type:Number, required:true, index:'2dsphere'}] ,
    },
    phone:{type:String, required:true},
})

module.exports = mongoose.model('venues', venueSchema);
