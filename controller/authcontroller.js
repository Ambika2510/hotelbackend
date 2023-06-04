const User = require('../model/user');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//JWT
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//getUser
const getUser = async(req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    } //loginUser
const loginUser = async(req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password)
            const token = createToken(user._id)
            const id = user._id

            res.status(200).json({ id, token })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    //signupUser
const signupUser = async(req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {
        const user = await User.signup(
            name,
            email,
            password
        );
        const id = user._id;
        const token = createToken(user._id);

        res.status(200).json({ id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//getalluser
const getalluser = async(req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }) //newest come first;

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
//updatePassword
const updatePassword = async(req, res) => {
        const { userid, oldpassword, newpassword } = req.body;
        // console.log(userid, oldpassword, newpassword)
        try {
            const user = await User.updatePassword(userid, oldpassword, newpassword)
            const token = createToken(user._id)
            const id = user._id;
            res.status(200).json({ id, token })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    //updateprofilepic
const updateprofilepic = async(req, res) => {
    const { id } = req.params;
    const { url } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { profileimage: url }, {
            new: true
        });

        res.status(200).json(user);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
module.exports = {
    getUser,
    loginUser,
    signupUser,
    getalluser,
    updatePassword,
    updateprofilepic
};