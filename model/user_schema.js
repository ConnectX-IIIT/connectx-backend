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
    password: {
        type: String
    },
    profilePicture: {
        type: String
    },
    backgroundPicture: {
        type: String
    },
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
    isMailVerified: {
        type: Boolean
    },
    isAdmin: {
        type: Boolean
    },
    reports: {
        type: Array
    },
    conversations: {
        type: Array
    },
    upvotedPosts: {
        type: Array
    },
    downvotedPosts: {
        type: Array
    },
    upvotedQuestions: {
        type: Array
    },
    downvotedQuestions: {
        type: Array
    },
    upvotedAnswers: {
        type: Array
    },
    downvotedAnswers: {
        type: Array
    },
    upvotedDiscussions: {
        type: Array
    },
    downvotedDiscussions: {
        type: Array
    },
    posts: {
        type: Array
    },
    discussions: {
        type: Array
    },
    comments: {
        type: Array
    },
    questions: {
        type: Array
    },
    answers: {
        type: Array
    }
})

const User = mongoose.model('Users', userSchema);

module.exports = User;