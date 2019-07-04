const mongoose = require('mongoose');

const creditsSchema = new mongoose.Schema({    
    type: {type:String, required:true},
    name: {type:String, required:true},
    url: {type:String, required:true}        
})


module.exports = mongoose.model('credits', creditsSchema);