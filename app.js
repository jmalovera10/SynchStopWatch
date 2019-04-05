require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const CRUD = require("./CRUD");

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    //
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'frontend/build/index.html'));
    })
}

app.get('/API/code', (req, res) => {
    CRUD.getCode(req, res);
});


app.get('/API/info/:code', (req, res) => {
    CRUD.getInfo(req, res);
});

app.listen(process.env.PORT||5000, () => {
    console.log(`Listening on :${process.env.PORT||5000}`);
});

