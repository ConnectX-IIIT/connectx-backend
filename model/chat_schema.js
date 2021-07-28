const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    reference: {
        type: String
    },
    picture: {
        type: String
    }
})

const Chat = mongoose.model('chats', chatSchema);

module.exports = Chat;