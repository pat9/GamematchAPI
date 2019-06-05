const mongoose = require('mongoose');

const arenasSchema = new mongoose.Schema({
    arenaId: {type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true},
    format: {type:String, required:true},
    rules: {type:String, required:true},
    status: {type: Boolean, required: true},
    streamed: {type: Boolean, required: true},
    userId: {type: String, required:false},
    loc:{      
        type:{type:String, required:true, default:"Point"},
        coordinates:[{type:Number, required:true, index:'2dsphere'}] ,
    }
})


module.exports = mongoose.model('arenas', arenasSchema);