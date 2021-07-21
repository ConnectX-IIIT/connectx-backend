const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: String,
    batch: {
        type: String,
        length: 3,
        required: true
    },
    joiningYear: {
        type: Number,
        length: 4,
        required: true
    },
    passingYear: {
        type: Number,
        length: 4,
        required: true
    },
    isAlumni: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    reports: Array,
    chats: Array,
    posts: Array,
    questions: Array

})

const User = mongoose.model('Users', userSchema);

module.exports = User;