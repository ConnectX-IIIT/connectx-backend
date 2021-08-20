const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userIds: {
        type: Array
    }
})

const Conversation = mongoose.model('conversations', conversationSchema);

module.exports = Conversation;