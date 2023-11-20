const mongoose = require('mongoose');
const Room = require('../models/roomSchema');
const User = require('../models/userSchema');

const bookingSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    bookingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookingRoomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    bookingStartTime: {
        type: Date,
        required: true
    },
    bookingEndTime: {
        type: Date,
        required: true
    },
    bookingDuration: {
        type: Number,
        required: true
    },
    bookingTitle: {
        type: String,
        required: true
    },
    bookingDescription: {
        type: String,
        required: true
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

