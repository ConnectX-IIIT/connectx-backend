const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    jobLink: {
        type: String
    },
    isProject: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    reactions: {
        type: Number
    },
    discussions: {
        type: Array
    },
    reports: {
        type: Array
    },
    upvotedUsers: {
        type: Array
    },
    downvotedUsers: {
        type: Array
    },
    attachedImages: {
        type: Array
    },
    imageHeights: {
        type: Array
    },
    imageWidths: {
        type: Array
    }

})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;