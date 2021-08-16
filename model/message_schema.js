const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    conversationId: {
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

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;