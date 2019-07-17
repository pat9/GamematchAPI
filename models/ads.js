const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    idVenue:{type:mongoose.SchemaTypes.ObjectId, required:true},
    titulo:{type:String, required:true},
    descripcion:{type:String, required:true},
    imagen:{type:String, required:true},
    isCupon:{type:Boolean, required:true},
    fechaCreacion:{type:Date, required:true, default:Date.now()},
    fechaLimite:{type:Date, required:false, default:Date.now()},
    numUsaurios:{type:Number, required:false},
})

module.exports = mongoose.model('ads', adsSchema);