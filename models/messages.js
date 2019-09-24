const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    idChat:{type:mongoose.SchemaTypes.ObjectId, required:true},
    idUser:{type:mongoose.SchemaTypes.ObjectId, required:true},
    message:String,
    date:{type:Date, default:new Date()}
})

module.exports = mongoose.model('messages', messageSchema);