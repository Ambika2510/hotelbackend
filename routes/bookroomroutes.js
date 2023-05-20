const express = require('express')
const router = express.Router()
const { bookroom, getToken, getroombyuser } = require('../controller/bookingcontroller')
router.post('/bookroom', bookroom)
router.get('/gettoken', getToken)
router.get('/getroombyuser/:id', getroombyuser)
module.exports = router