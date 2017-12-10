//this is the model file

const mongoose = require('mongoose');

//Book Schema

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  genre: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    require: true
  },
  pages : {
    type: String
  },
  publisher : {
    type: String,
  },
  image_url: {
    type: String,
  },
  buy_url: {
    type: String,
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

//Get Books

module.exports.getBooks = function(callback, limit) {
  Book.find(callback).limit(limit);
};

//Get 1 Book

module.exports.getBookById = function(id, callback) {
  Book.findById(id, callback); //findById is a mongoose method
};

//Add Books

module.exports.addBook = function(book, callback) {
  Book.create(book, callback);
};

// Update Books

module.exports.updateBook = function(id, book, options, callback) {
  var query = { _id: id };
  var update = {
    title: book.title,
    genre: book.genre,
    description: book.description,
    author: book.author,
    publisher: book.publisher,
    pages: book.pages,
    image_url: book.image_url,
    buy_url: book.buy_url
  };
  Book.findOneAndUpdate(query, update, options, callback);
  //findOneAndUpdate is mongoose method
};

//Delete Book

module.exports.deleteBook = function(id, callback) {
  var query = { _id: id };
  Book.remove(query, callback);
  //remove, not destroy
};
