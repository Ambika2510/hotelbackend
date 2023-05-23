const express = require('express')
const router = express.Router()
const { bookroom, getToken, getroombyuser, updatebooking, getallbookings } = require('../controller/bookingcontroller')
router.post('/bookroom', bookroom)
router.get('/gettoken', getToken)
router.get('/getroombyuser/:id', getroombyuser)
router.patch('/updatebooking/:id', updatebooking)
router.get('/getallbooking', getallbookings);
module.exports = router