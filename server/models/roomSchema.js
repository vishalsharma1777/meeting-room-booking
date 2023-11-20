const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roomName: {
        type: String,
        required: true
    },
    roomNumber:{
        type: Number,
        required: true,
        unique: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomFloor: {
        type: String,
        required: true

    },
    roomCapacity: {
        type: Number,
        required: true
    },
    roomFormal: {
        type: Boolean,
        required: true
    },
    roomBookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]

});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;