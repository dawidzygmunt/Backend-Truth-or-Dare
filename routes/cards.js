const express = require('express')
const router = express.Router()

const {
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
  getChallengeCardsAmount
} = require('../controllers/cards')
  

router.route('/cards').get(getAllCards).post(createCard)
router.route('/cards/:id').get(getSingleCard).patch(updateCard).delete(deleteSingleCard)

router.route('/players').get(getAllPlayers).post(createPlayer)
router.route('/players/:id').patch(updatePlayer).delete(deletePlayer)

router.route('/game').get(getAllCardsGame)
router.route('/game/:id').patch(updateCardGame)
router.route('/game/draw').get(drawSingleCardGame)

router.route('/cloneData').get(CloneScheme)

router.route('/statistics/all-basic').get(getAllCardsAmountBasic)
router.route('/statistics/truth-basic').get(getTruthCardsAmountBasic)
router.route('/statistics/challenge-basic').get(getChallengeCardsAmountBasic)

router.route('/statistics/all').get(getAllCardsAmount)
router.route('/statistics/truth').get(getTruthCardsAmount)
router.route('/statistics/challenge').get(getChallengeCardsAmount)


module.exports = router;