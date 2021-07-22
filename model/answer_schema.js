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
    timestamp: {
        type: Number,
        required: true
    },
    reference: {
        type: String
    },
    attachedImages: {
        type: Array
    },
    upvotes: {
        type: Number
    },
    lastUpdate: {
        type: Number
    },
    reports: {
        type: Array
    }
})

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;