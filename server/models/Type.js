const mongoose = require('mongoose')
const typeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Type", typeSchema) 