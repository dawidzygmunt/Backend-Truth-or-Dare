const Baza = require('../models/baza')
const Kolekcja = require('../models/collection')
const Edycja = require('../models/editions')
const Players = require('../models/players')
const Assigned = require('../models/assigned')
const GameDatabase = require('../models/bazaGra')
const asyncWrapper = require('../middleware/async')
const { createNewError } = require('../errors/custom-errors')


// Operacje na Edycji kart (np. Prawda czy wyzwanie)



const getAllEditions = asyncWrapper(async (req, res) => {
  const editions = await Edycja.find({})
  res.status(200).json({ editions })
})

const getSingleEdition = asyncWrapper(async (req, res) => {
  const { id: editionId } = req.params
  const editions = await Edycja.findOne({ _id: editionId })
  res.status(200).json({ editions })
})

const createEdition = asyncWrapper(async (req, res) => {
  const editions = await Edycja.create(req.body)
  res.status(201).json({ editions })
})

const deleteSingleEdition = asyncWrapper(async (req, res) => {
  const { id: editionId } = req.body
  const edition = await Edycja.findOneAndDelete({ editionId })
  res.status(200).json({ edition })
})

// Operacje na Kolekcji kart (np. Classic, albo Hard)

const getAllCollections = asyncWrapper(async (req, res) => {
  const collections = await Kolekcja.find({})
  res.status(200).json({ collections })
})

const getSingleCollection = asyncWrapper(async (req, res) => {
  const { id: collectionId } = req.params
  console.log(collectionId);
  const collections = await Kolekcja.findOne({ _id: collectionId })
  res.status(200).json({ collections })
})

const createCollection = asyncWrapper(async (req, res) => {
  const collection = await Kolekcja.create(req.body)
  const { editionId } = req.body
  console.log(editionId);
  const edycja = await Edycja.findById(editionId)
  console.log(edycja);
  edycja.kolekcja.push(collection)
  await edycja.save();
  res.status(201).json({ collection })
})

const delateSingleCollection = asyncWrapper(async (req, res) => {
  const { id: collectionId } = req.body
  const collection = await Kolekcja.findOneAndDelete({ collectionId })
  res.status(200).json({ collection })
})


// OPERCAJE NA ORYGINALNEJ BAZIE DANYCH
const getAllCards = asyncWrapper(async (req, res) => {
  const { page: page } = req.query
  console.log(page);
  pagelimit = parseInt(page)
  console.log(pagelimit);
  const maxPerPage = 20
  const skip = (pagelimit - 1) * maxPerPage
  const cards = await Baza.find({}).skip(skip).limit(maxPerPage)
  res.status(200).json({ cards, nbHits: cards.length })
})

const getSingleCard = asyncWrapper(async (req, res, next) => {
  const { id: cardID } = req.params
  console.log(cardID);
  const card = await Baza.findOne({ _id: cardID })
  if (!card) {
    return next(createNewError('Nie ma takiej karty : ' + cardID, 404))
  }
  res.status(200).json({ card })
})

const createCard = asyncWrapper(async (req, res) => {
  const card = await Baza.create(req.body)
  res.status(201).json({ card })
})

const deleteSingleCard = asyncWrapper(async (req, res) => {
  const { id: uniquePlayerID } = req.params
  const card = await Baza.findOneAndRemove({ _id: uniquePlayerID })
  if (!card) {
    return next(createNewError('Nie ma karty z takim ID', 404))
  }
  res.status(201).json({ card })
})

const updateCard = asyncWrapper(async (req, res) => {
  const { id: uniquePlayerID } = req.params
  const card = await Baza.findOneAndUpdate({ _id: uniquePlayerID }, req.body)
  if (!card) {
    return next(createNewError('Nie ma karty z takim ID', 404))
  }
  res.status(201).json({ card })
})



// OPERACJE NA BAZIE GRA
const getAllCardsGame = asyncWrapper(async (req, res) => {
  const cards = await GameDatabase.find({})
  res.status(200).json({ cards, nbHits: cards.length })
})

const getSingleCardGame = asyncWrapper(async (req, res, next) => {
  const { id: cardID } = req.params
  console.log(cardID);
  const card = await GameDatabase.findOne({ _id: cardID })
  if (!card) {
    return next(createNewError('Nie ma takiej karty : ' + cardID, 404))
  }
  res.status(200).json({ card })
})

const drawSingleCardGame = asyncWrapper(async (req, res, next) => {
  const { typ: cardType } = req.query
  console.log(cardType);
  const card = await GameDatabase.aggregate([
    { $match: { typ: cardType, ilosc: { $gt: 0 } } },
    { $sample: { size: 1 } }
  ])
  console.log(card.length);
  if (card.length < 1) {
    return next(createNewError('Koniec kart: ' + cardType, 204))
  }
  res.status(200).json({ card })
})

const updateCardGame = asyncWrapper(async (req, res) => {
  const { id: uniquePlayerID } = req.params
  const card = await GameDatabase.findOneAndUpdate({ _id: uniquePlayerID }, req.body)
  if (!card) {
    return next(createNewError('Nie ma karty z takim ID', 404))
  }
  res.status(201).json({ card })
})



// GRACZE
const getAllPlayers = asyncWrapper(async (req, res) => {
  const players = await Players.find({}).sort({ date: -1 })
  res.status(200).json({ players, nbHits: players.length })
})

const getSinglePlayer = asyncWrapper(async (req, res) => {
  const players = await Players.find({})
  res.status(200).json({ players })
})

const createPlayer = asyncWrapper(async (req, res) => {
  const player = await Players.create(req.body)
  res.status(201).json({ player })
})

const updatePlayer = asyncWrapper(async (req, res) => {
  const { id: uniquePlayerID } = req.params
  const player = await Players.findOneAndUpdate({ _id: uniquePlayerID }, req.body)
  if (!player) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(201).json({ player })
})

const deletePlayer = asyncWrapper(async (req, res) => {
  const { id: uniquePlayerID } = req.params
  const player = await Players.findOneAndDelete({ _id: uniquePlayerID })
  if (!player) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(201).json({ player })
})



// INNE OPERACJE
const CloneScheme = asyncWrapper(async (req, res) => {
  const sourceData = await Baza.find({})
  await GameDatabase.deleteMany(); // Usuń wszystkie dokumenty z kolekcji
  await GameDatabase.insertMany(sourceData)
  res.status(201).json({ message: 'Kolekcja została skopiowana' })
})

const getAllCardsAmountBasic = asyncWrapper(async (req, res) => {
  const cards = await Baza.find()
  if (!cards) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(200).json({ cards, nbHits: cards.length })
})

const getTruthCardsAmountBasic = asyncWrapper(async (req, res) => {
  const cards = await Baza.find({ typ: 'Prawda' })
  if (!cards) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(200).json({ cards, nbHits: cards.length })
})

const getChallengeCardsAmountBasic = asyncWrapper(async (req, res) => {
  const cards = await Baza.find({ typ: 'Wyzwanie' })
  if (!cards) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(200).json({ cards, nbHits: cards.length })
})

const getAllCardsAmount = asyncWrapper(async (req, res) => {
  const cards = await Baza.find()
  let licznik = 0
  cards.forEach(element => {
    console.log(element);
    licznik = licznik + element.ilosc
  });
  if (!cards) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(200).json({ cards, nbHits: licznik })
})

const getTruthCardsAmount = asyncWrapper(async (req, res) => {
  const cards = await Baza.find({ typ: 'Prawda' })
  let licznik = 0
  cards.forEach(element => {

    licznik = licznik + element.ilosc
  });
  if (!cards) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(200).json({ cards, nbHits: licznik })
})

const getChallengeCardsAmount = asyncWrapper(async (req, res) => {
  const cards = await Baza.find({ typ: 'Wyzwanie' })
  let licznik = 0
  cards.forEach(element => {
    licznik = licznik + element.ilosc
  });
  if (!cards) {
    return next(createNewError('Nie ma gracza z takim ID', 404))
  }
  res.status(200).json({ cards, nbHits: licznik })
})










module.exports = {
  getAllCards,
  getSingleCard,
  createCard,
  getAllPlayers,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  CloneScheme,
  getAllCardsGame,
  updateCardGame,
  drawSingleCardGame,
  deleteSingleCard,
  updateCard,
  getAllCardsAmountBasic,
  getTruthCardsAmountBasic,
  getChallengeCardsAmountBasic,
  getAllCardsAmount,
  getTruthCardsAmount,
  getChallengeCardsAmount,
  getAllCollections,
  createCollection,
  getSingleCollection,
  getAllEditions,
  getSingleEdition,
  createEdition,
  delateSingleCollection,
  deleteSingleEdition
}