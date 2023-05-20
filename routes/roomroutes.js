const express = require('express')
const router = express.Router()
const { getallrooms, createroom, getroomdetail, updateroom } = require('../controller/roomcontroller')
router.get('/getallrooms', getallrooms)
router.post('/createroom', createroom)
router.get('/getroomdetail/:id', getroomdetail)
router.patch('/updateroom/:id', updateroom)
module.exports = router