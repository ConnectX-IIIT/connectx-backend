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
        type: Number
    },
    authType: {
        type: Number
    },
    password: {
        type: String
    },
    profilePicture: String,
    batch: {
        type: String
    },
    joiningYear: {
        type: Number
    },
    gender: {
        type: String,
        length: 1
    },
    passingYear: {
        type: Number
    },
    description: {
        type: String
    },
    isAlumni: {
        type: Boolean
    },
    isVerified: {
        type: Boolean
    },
    isAdmin: {
        type: Boolean
    },
    reports: Array,
    chats: Array,
    posts: Array,
    questions: Array

})

const User = mongoose.model('Users', userSchema);

module.exports = User;