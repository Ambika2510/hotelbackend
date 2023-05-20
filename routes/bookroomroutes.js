const express = require('express')
const router = express.Router()
const { bookroom, getToken } = require('../controller/bookingcontroller')
router.post('/bookroom', bookroom)
router.get('/gettoken', getToken)
module.exports = router