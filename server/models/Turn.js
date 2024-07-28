const mongoose = require('mongoose')
const turnSchema = new mongoose.Schema({
    turnDate: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date() + 7 * 24 * 60 * 1000
    },
    start: {
        hour: {
            type: Number,
            required: true,
            min: 9,
            max: 16 // 5pm in 24-hour format
        },
        minutes: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    end: {
        hour: {
            type: Number,
            required: true,
            min: 9,
            max: 17 // 6pm in 24-hour format
        },
        minutes: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"Type"
    },
    deleted:{
        type:Boolean,
        default:false
    },
    notes: String
}, {
    timestamps: true
});
module.exports = mongoose.model("Turn", turnSchema)