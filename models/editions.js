const mongoose = require('mongoose')


const edition = new mongoose.Schema({
  nazwa: {
    type: String,
    required: [true, 'Podaj nazwe Edycji']
  },
  kolekcja: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kolekcja"
  }]
});



module.exports = mongoose.model('Edycja', edition)