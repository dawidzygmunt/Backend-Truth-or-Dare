const mongoose = require('mongoose')

const players = new mongoose.Schema({
  playerName: {
    type: String,
    required: [true, 'Podaj imie'],
    trim: true,
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  questionValue: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Gracze', players)