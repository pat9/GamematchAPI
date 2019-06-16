const mongoose = require('mongoose');

const invitationsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    createdAt:{type:Date, default:Date()}
})

module.exports = mongoose.model('invitations', venueSchema);
