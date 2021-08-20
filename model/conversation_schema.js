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
    }
})

const Conversation = mongoose.model('conversations', conversationSchema);

module.exports = Conversation;