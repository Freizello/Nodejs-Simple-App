const express = require('express'); //use express js
const path = require('path');
const mongoose = require('mongoose');

// DB Setup and connection
const dbpath = 'mongodb://localhost/simpleapp'; 
mongoose.connect(dbpath);
let db = mongoose.connection;

// check conn
db.once('open', function(){
  console.log('connected to mongodb');
});

// db errors checking
db.on('error', function(err){
  console.log(err);
});

const app = express(); // init app

// bring models
let Article = require('./models/article');

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        articles: articles
      });
    }
  });
});

// Add Route

app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'add Article'
  });
});

// Start Server
app.listen(3000, function(){
  console.log('server started on port 3000');
});
