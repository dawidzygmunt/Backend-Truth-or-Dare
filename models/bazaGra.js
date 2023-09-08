const mongoose = require('mongoose')



const gameDatabase = new mongoose.Schema({
  tresc:{
    type:String,
    required:[true, 'Podaj tresc karty'],
    trim: true,
  },
  typ:{
    type:String,
    required: [true, 'Podaj typ karty']
  },
  ilosc:{
    type:Number,
    required: [true, 'Podaj ilosc']
  },
  kara:{
    type:Number,
    required: [true, 'Podaj typ karty']
  }

})

module.exports = mongoose.model('gameDatabase', gameDatabase)