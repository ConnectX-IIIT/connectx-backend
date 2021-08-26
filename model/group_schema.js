const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    members: {
        type: Array,
        default: []
    },
    profilePicture: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    lastMessage: {
        type: String
    },
    lastModified: {
        type: Number
    }
})

const Group = mongoose.model('groups', groupSchema);

module.exports = Group;