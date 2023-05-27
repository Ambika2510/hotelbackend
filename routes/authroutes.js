const express = require('express')
const Authorization = require('../middleware/Authorization')
const { getUser, signupUser, loginUser, getalluser, updatePassword } = require('../controller/authcontroller')
const router = express.Router()
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user/:id", Authorization, getUser);
router.get("/getalluser", Authorization, getalluser);
router.post("/updatepassword", Authorization, updatePassword)
module.exports = router