const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer: {
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
    timestamp: {
        type: Number,
        required: true
    },
    questionId: {
        type: String
    },
    upvotes: {
        type: Number
    },
    upvotedUsers: {
        type: Array
    },
    downvotedUsers: {
        type: Array
    },
    reports: {
        type: Array
    },
    comments: {
        type: Array
    }
})

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;