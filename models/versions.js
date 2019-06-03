const mongoose = require('mongoose');

const versionsSchema = new mongoose.Schema({
    version: {type:String, required:true},
    devolopers:[ {type:String, required:true}] ,
    credits: {type:String, required:true},
    contact: {type:String, required:true},
   
    
})


module.exports = mongoose.model('versions', versionsSchema);