const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth')
require('dotenv').config();
require('./configs/database');

const app = express();
const port = process.env.PORT;
app.use(express.static('assets'));
const path = require('path');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    // res.status(200).json({
    //     message: 'server running perfectly'
    // })
    let options = {
        root: path.join(__dirname),
    };

    let fileName = "user_verification_mail.html";

    return res.status(200).sendFile(fileName, options);
})



app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log('server is running at port', port);
})