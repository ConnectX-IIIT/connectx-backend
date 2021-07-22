const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    chats: {
        type: Array
    },
    profilePicture: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const Group = mongoose.model('groups', groupSchema);

module.exports = Group;