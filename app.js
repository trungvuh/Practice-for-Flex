//this is the route file

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Genre = require('./models/genre');
const Book = require('./models/book');

var app = express();
app.use(bodyParser.json());

//Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore'); //location of the database
var db = mongoose.connection;

//Check for connection
db.once('open', function() {
  console.log('Connected to MongoDB');
});

//Check for database error

db.on('error', function(error) {
  console.log(error);
});
   
app.get('/', function(req, res) {
  res.send('Please use /api/books or /api/genres'); // send to the browser what we want
}); //handle the GET request from the uri

app.get('/api/genres', function(req, res) {
  Genre.getGenres(function(err, genres){
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.get('/api/genres/:_id', function(req, res) {
  Genre.getGenreById(req.params._id, function(err, genre){
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.post('/api/genres', function(req, res) {
  var genre = req.body;
  Genre.addGenre(genre, function(err, newGenre){
    if (err) {
      throw err;
    }
    res.json(newGenre);
  });
});

app.put('/api/genres/:_id', function(req, res) {
  var genre = req.body;
  var id = req.params._id;

  Genre.updateGenre(id, genre, {}, function(err, newGenre){
    if (err) {
      throw err;
    }
    res.json(newGenre);
  });
});

app.delete('/api/genres/:_id', function(req, res) {
  var id = req.params._id;

  Genre.deleteGenre(id, function(err, newGenre){
    if (err) {
      throw err;
    }
    res.json(newGenre);
  });
});

/////

app.get('/api/books', function(req, res) {
  Book.getBooks(function(err, books){
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get('/api/books/:_id', function(req, res) {
  Book.getBookById(req.params._id, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.post('/api/books', function(req, res) {
  var book = req.body;
  Book.addBook(book, function(err, newBook){
    if (err) {
      throw err;
    }
    res.json(newBook);
  });
});

app.put('/api/books/:_id', function(req, res) {
  var book = req.body;
  var id = req.params._id;

  Book.updateBook(id, book, {}, function(err, newBook){
    if (err) {
      throw err;
    }
    res.json(newBook);
  });
});

app.delete('/api/books/:_id', function(req, res) {
  var id = req.params._id;

  Book.deleteBook(id, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  });
});


app.listen(3000); //tell our app to listen to port 3000
console.log('Running on port 3000...');
