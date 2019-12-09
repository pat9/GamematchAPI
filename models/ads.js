const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    idVenue:{type:mongoose.SchemaTypes.ObjectId, required:true},
    titulo:{type:String, required:true},
    imagen:{type:Object, required:false},
    
})

module.exports = mongoose.model('ads', adsSchema);