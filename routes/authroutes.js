const express = require('express')
const Authorization = require('../middleware/Authorization')
const { getUser, signupUser, loginUser, getalluser } = require('../controller/authcontroller')
const router = express.Router()
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user/:id", Authorization, getUser);
router.get("/getalluser", Authorization, getalluser);
module.exports = router