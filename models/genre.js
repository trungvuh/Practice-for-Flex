//this is the model and also the controller file

const mongoose = require('mongoose');

//Genre Schema

var genreSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

//Get Genres

module.exports.getGenres = function(callback, limit) {
  Genre.find(callback).limit(limit);
};

// Add Genre

module.exports.addGenre = function(genre, callback) {
  Genre.create(genre, callback);
};

//Get 1 Genre

module.exports.getGenreById = function(id, callback) {
  Genre.findById(id, callback); //findById is a mongoose method
};

//Update Genre

module.exports.updateGenre = function(id, genre, options, callback) {
  var query = { _id: id };
  var update = {
    name: genre.name
  };
  Genre.findOneAndUpdate(query, update, options, callback);
  //findOneAndUpdate is mongoose method
};


//Delete Genre

module.exports.deleteGenre = function(id, callback) {
  var query = { _id: id };
  Genre.remove(query, callback);
  //remove, not destroy
};
