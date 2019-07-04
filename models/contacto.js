const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
    email : {type : String , required : true},
    telefono : {type : String , required : true},
    link : {type : String , required : true},
    direccion : {type : String , required : true}
})

module.exports = mongoose.model('contacto', ContactoSchema);