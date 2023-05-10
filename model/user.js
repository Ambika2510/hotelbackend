const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
    },
    isadmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
//static signup method
userSchema.statics.signup = async function(
    name,
    email,
    password

) {
    //validation
    if (!name || !email || !password) {
        throw Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw Error("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error(
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
    }
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        name,
        email,
        password: hash,


    });
    return user;
};
//static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect Email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect Password");
    }
    return user;
};
module.exports = mongoose.model("hoteluser", userSchema);