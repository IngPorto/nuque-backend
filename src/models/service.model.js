const mongoose = require('mongoose')

const ServiceSchema = mongoose.Schema({
    project: String,
    workspace: String,
    filename: String,
    description: String,
    creation_time: Date,
}, { strict: false, versionKey: false})

module.exports = mongoose.model("Service", ServiceSchema)