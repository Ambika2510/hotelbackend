const express = require('express')
const router = express.Router()
const Authorization = require('../middleware/Authorization')
const { getallrooms, createroom, getroomdetail, updateroom } = require('../controller/roomcontroller')
router.get('/getallrooms', getallrooms)
router.post('/createroom', Authorization, createroom)
router.get('/getroomdetail/:id', getroomdetail)
router.patch('/updateroom/:id', Authorization, updateroom)
module.exports = router