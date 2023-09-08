const mongoose = require('mongoose')

const assigned = new mongoose.Schema({
  playerName: {
    type: String,
    required: [true, 'Podaj imie']
  },
  assignedQuestions: {
    type: mongoose.Types.ObjectId, ref: 'Baza',
  }
})

module.exports = mongoose.model('AssignedQuestions', assigned)