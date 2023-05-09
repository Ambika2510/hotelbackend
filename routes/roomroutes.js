const express = require('express')
const router = express.Router()
const { getallrooms, createroom, getroomdetail } = require('../controller/roomcontroller')
router.get('/getallrooms', getallrooms)
router.post('/createroom', createroom)
router.get('/getroomdetail/:id', getroomdetail)
module.exports = router