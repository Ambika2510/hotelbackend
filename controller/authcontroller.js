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

module.exports = { getUser, loginUser, signupUser };