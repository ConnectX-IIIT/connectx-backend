const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const postRoutes = require('./routes/post');
const discussionRoutes = require('./routes/discussion');
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
app.use('/discussion', discussionRoutes);

app.listen(port);