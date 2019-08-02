const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    telefono : {type : String, required : true},
    celular : {type : String, required : true},
    facebook : {type : String, required : true},
    instagram : {type : String, required : true},
    twitch : {type : String, required : true},
    descripcion : {type : String, required : true}
})

module.exports = mongoose.model('about', AboutSchema);