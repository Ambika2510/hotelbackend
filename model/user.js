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
    },
    profileimage: {
        type: String,
        default: "https://flowbite.com/docs/images/logo.svg"
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
//update password
//static updatePassword method
userSchema.statics.updatePassword = async function(userid, oldpassword, newpassword) {
    if (!oldpassword || !newpassword) {
        throw Error('All fields must be filled')
    }
    const user = await this.findById(userid);
    if (!user) {
        throw Error("First you have to login");
    }

    const match = await bcrypt.compare(oldpassword, user.password);
    if (!match) {
        throw Error("Incorrect Old Password");
    }
    if (!validator.isStrongPassword(newpassword)) {
        throw Error('New Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newpassword, salt)
    const pass = await this.findByIdAndUpdate(userid, {
        password: hash
    }, {
        new: true
    })


    return pass
}
module.exports = mongoose.model("hoteluser", userSchema);