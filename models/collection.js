const mongoose = require('mongoose')



const collection = new mongoose.Schema({
  nazwa: {
    type: String,
    required: [true, 'Podaj nazwe karty']
  },
  cena: {
    type: Number,
    required: [true, 'Podaj Cene']
  },
  karty: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Baza"
  }]
});



module.exports = mongoose.model('Kolekcja', collection)