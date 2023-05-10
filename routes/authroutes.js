const express = require('express')
const { authorization } = require('../middleware/authorization')
const { signupUser, loginUser } = require('../controller/authcontroller')
const router = express.Router()
router.post("/signup", signupUser);
router.post("/login", loginUser);
module.exports = router