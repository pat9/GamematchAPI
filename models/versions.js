const mongoose = require('mongoose');

const versionsSchema = new mongoose.Schema({
    version: {type:String, required:false},
    developers:{type:String, required:true},
    description: {type:String, required:true},
    position: {type:String, required:true},
    contact: {type:String, required:true}       
})


module.exports = mongoose.model('versions', versionsSchema);