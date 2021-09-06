const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const postRoutes = require('./routes/post');
const groupRoutes = require('./routes/group');
const reportRoutes = require('./routes/report');
const answerRoutes = require('./routes/answer');
const commentRoutes = require('./routes/comment');
const messageRoutes = require('./routes/message');
const questionRoutes = require('./routes/question');
const discussionRoutes = require('./routes/discussion');
const conversationRoutes = require('./routes/conversation');
require('dotenv').config();
require('./configs/database');

const app = express();
const port = process.env.PORT;
app.use(express.static('assets'));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server running perfectly'
    })
})

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/home', homeRoutes);
app.use('/post', postRoutes);
app.use('/group', groupRoutes);
app.use('/report', reportRoutes);
app.use('/answer', answerRoutes);
app.use('/comment', commentRoutes);
app.use('/message', messageRoutes);
app.use('/question', questionRoutes);
app.use('/discussion', discussionRoutes);
app.use('/conversation', conversationRoutes);

app.listen(port);