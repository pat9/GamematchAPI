const mongoose = require('mongoose');

const arenasSchema = new mongoose.Schema({
    arenaId: {type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true},
    format: {type:String, required:true},
    rules: {type:String, required:true},
    status: {type: String, required: true},
    streamed: {type: String, required: true},
    date: {type: Date, require: true, default: new Date()},
    userId: {type: String, required:true},
    loc:{      
        type:{type:String, required:false, default:"Point"},
        coordinates:[{type:Number, required:false, index:'2dsphere'}] ,
    }
})


module.exports = mongoose.model('arenas', arenasSchema);