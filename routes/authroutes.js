const express = require('express')
const { authorization } = require('../middleware/authorization')
const { getUser, signupUser, loginUser } = require('../controller/authcontroller')
const router = express.Router()
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user/:id", getUser);
module.exports = router