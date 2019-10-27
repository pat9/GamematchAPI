const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat:{type:mongoose.SchemaTypes.ObjectId, required:true},
    user:{type:mongoose.SchemaTypes.ObjectId, required:true, ref:'users'   },
    message:String,
    date:{type:Date, default:new Date()}
})

module.exports = mongoose.model('messages', messageSchema);