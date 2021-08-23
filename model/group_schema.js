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
    }
})

const Group = mongoose.model('groups', groupSchema);

module.exports = Group;