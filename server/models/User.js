const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    roles: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
        required: true
    },
    active:{
        type:Boolean,
        default:true
    },
    deleted: {
        type: Boolean,
        required: true,
        default:false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;
