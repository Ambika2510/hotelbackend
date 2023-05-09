const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomschema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true

    },
    rentperday: {
        type: Number,
        required: true
    },
    imageurl: [],
    currentbooking: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }



}, { timestamps: true });
module.exports = mongoose.model('room', roomschema);