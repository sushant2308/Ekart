const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Model Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true
    },

    username: {
        type: String,
        unique: true,
        required: 'Your username is required',
    },

    password: {
        type: String,
        required: 'Your password is required',
        max: 1024,
        min:6
    },

});

module.exports =mongoose.model('User',UserSchema);