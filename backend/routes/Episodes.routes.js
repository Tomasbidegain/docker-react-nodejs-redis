const Router = require('express');

const { getAllEpisodes, addEpisode, updateStatusEpisodes, confirmPayment, deleteAllEpisodes } = require('../controllers/Episodes.controllers')

const router = Router()

router.post('/add-episodes', addEpisode)
router.get('/get-all-episodes', getAllEpisodes)
router.post('/update-episodes', updateStatusEpisodes)
router.post('/confirmPayment', confirmPayment)
router.delete('/delete-all-episodes', deleteAllEpisodes)

module.exports = router