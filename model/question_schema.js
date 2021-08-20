const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    answers: {
        type: Array
    },
    timestamp: {
        type: Number,
        required: true
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
    upvotes: {
        type: Number
    }
})

const Question = mongoose.model('questions', questionSchema);

module.exports = Question;