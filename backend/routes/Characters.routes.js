const Router = require('express');

const { addCharacter, deleteCharacter, getAllCharacters, getAllCharactersByNumberEpisode } = require('../controllers/Characters.controllers')

const router = Router()

router.post('/add-character', addCharacter)
router.delete('/delete-character', deleteCharacter)
router.get('/get-all-characters', getAllCharacters)
router.post('/get-all-characters-by-number', getAllCharactersByNumberEpisode)


module.exports = router