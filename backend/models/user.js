const mongoose = require('mongoose')

//schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)