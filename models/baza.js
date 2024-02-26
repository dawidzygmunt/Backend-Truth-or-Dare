const mongoose = require('mongoose')



const dataOriginal = new mongoose.Schema({
  tresc: {
    type: String,
    required: [true, 'Podaj tresc karty'],
    trim: true,
  },
  typ: {
    type: String,
    required: [true, 'Podaj typ karty']
  },
  ilosc: {
    type: Number,
    required: [true, 'Podaj ilosc mozliwych powtorzen']
  },
  kara: {
    type: Number,
    required: [true, 'Wpisz ilość kieliszkow']
  }

})

module.exports = mongoose.model('Baza', dataOriginal)