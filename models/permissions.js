const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    name: String,
    number: Number
})

module.exports = mongoose.model('permissions', PermissionSchema)