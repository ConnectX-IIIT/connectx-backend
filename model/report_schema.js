const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true
    },
    reference: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    }
})

const Report = mongoose.model('reports', reportSchema);

module.exports = Report;