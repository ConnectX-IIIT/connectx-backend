const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    answerId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    userProfile: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    reactions: {
        type: Number
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

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
