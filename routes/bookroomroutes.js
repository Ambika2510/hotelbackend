const express = require('express')
const router = express.Router()
const Authorization = require('../middleware/Authorization')
const { bookroom, getToken, getroombyuser, updatebooking, getallbookings } = require('../controller/bookingcontroller')
router.post('/bookroom', Authorization, bookroom)
router.get('/gettoken', getToken)
router.get('/getroombyuser/:id', Authorization, getroombyuser)
router.patch('/updatebooking/:id', Authorization, updatebooking)
router.get('/getallbooking', Authorization, getallbookings);
module.exports = router