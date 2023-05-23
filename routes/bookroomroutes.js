const express = require('express')
const router = express.Router()
const { bookroom, getToken, getroombyuser, updatebooking } = require('../controller/bookingcontroller')
router.post('/bookroom', bookroom)
router.get('/gettoken', getToken)
router.get('/getroombyuser/:id', getroombyuser)
router.patch('/updatebooking/:id', updatebooking)
module.exports = router