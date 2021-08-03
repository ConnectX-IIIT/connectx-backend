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
    userName: {
        type: String,
        required: true
    },
    userProfile: {
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
    attachedImages: {
        type: Array
    }

})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;