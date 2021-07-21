const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to database');
}).catch((error) => {
    console.log('error occured with db');
})
