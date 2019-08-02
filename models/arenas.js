const mongoose = require('mongoose');

const arenasSchema = new mongoose.Schema({
    arenaId: {type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true},
    format: {type:String, required:false},
    rules: {type:String, required:false},
    status: {type: Boolean, required: false},
    streamed: {type: Boolean, required: false},
    date: {type: Date, require: true, default: new Date()},
    userId: {type: String, required:true},
    arenaAct: {type: Boolean, required:true, default: true},
    loc:{      
        type:{type:String, required:false, default:"Point"},
        coordinates:[{type:Number, required:false, index:'2dsphere'}] ,
    }
})


module.exports = mongoose.model('arenas', arenasSchema);