const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Post", postSchema) 