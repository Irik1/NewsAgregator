const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const userModelRoute = require('./model-routes/user-model-route');

module.exports = async function(PORT) {
    const app = express();
    mongoose.connect('mongodb://localhost:27017/mevn-course', { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));
    app.use(express.json());
    //connect to db
    // await connectDb();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(morgan('dev'));
    // app.use(bodyParser.json());
    //DB Users
    userModelRoute(app);
    app.listen(PORT, () => console.log(`server backend listening port ${PORT}`));
};
