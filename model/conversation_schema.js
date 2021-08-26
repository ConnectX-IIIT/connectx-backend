const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userIds: {
        type: Array
    },
    userProfiles: {
        type: Array
    },
    userNames: {
        type: Array
    },
    lastMessage: {
        type: String
    },
    lastModified: {
        type: Number
    }
})

const Conversation = mongoose.model('conversations', conversationSchema);

module.exports = Conversation;