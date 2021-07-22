const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth')
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

app.listen(port, () => {
    console.log('server is running at port', port);
})