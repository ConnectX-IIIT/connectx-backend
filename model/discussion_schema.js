const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    reports: {
        type: Array
    },
    replies: {
        type: Array
    },
    upvotedUsers: {
        type: Array
    },
    downvotedUsers: {
        type: Array
    },
    reference: {
        type: String
    }
})

const Discussion = mongoose.model('discussions', discussionSchema);

module.exports = Discussion;