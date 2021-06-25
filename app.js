var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var moviesRouter = require('./routes/movies');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter);



app.get('/setCookie', (_,res) => {
    res.cookie("firstName", "Jacob");
    res.cookie("lastName", "Musselman");
    res.status(200).send("Cookie set");
})

app.get('/readCookie', (req, res) => {
  let myCookies = req.cookies
  res.status(200).send(`${myCookies.firstName} ${myCookies.lastName} we know who you are and what you did last summer`)
})
module.exports = app;
