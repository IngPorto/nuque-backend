const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    projects: [
        {
            _id: mongoose.Schema.Types.ObjectId, 
            name: String, 
            description: String,
            cration_time: Date,
            services: [mongoose.Schema.Types.ObjectId]
        }
    ]
}, { strict: false, versionKey: false  })

module.exports = mongoose.model("User", UserSchema)