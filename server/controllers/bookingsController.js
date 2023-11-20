const { request, response } = require('express');
const Booking = require('../models/bookingSchema');
const Room = require('../models/roomSchema');
const User = require('../models/userSchema');


const getBookings = (request, response) => {
    Booking.find()
        .populate('bookingUser').populate('bookingRoomID')
        .then((data) => {
            response.status(200);
            response.json(data);

        })
        .catch((error) => {
            response.status(500);
            response.json(error);
        }
        );
}

const deleteBookingByID = async (request, response) => {
    const { id, userId } = request.params;
    console.log(id, userId);
    try {
        const data = await Booking.findOneAndDelete({
            bookingUser: userId,
            _id: id
        });

        if (!data) {
            response.status(404).json({ error: "Booking not found" });
            return;
        }

        await User.findByIdAndUpdate(userId, { $pull: { bookings: id } });
        await Room.findByIdAndUpdate(data.bookingRoomID, { $pull: { roomBookings: id } });

        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal server error" });
    }
};


const getOnGoingBookings = (request, response) => {
    Booking.find({
        bookingStartTime: { $lt: new Date() },
        bookingEndTime: { $gt: new Date() }
    }).populate('bookingUser').populate('bookingRoomID')
        .then((data) => {
            console.log(new Date());
            response.status(200);
            response.json(data);
        })
        .catch((error) => {
            response.status(500);
            response.json(error);
        });
}

// const bookingData = {
//     bookingUserId,
//     bookingRoomId,
//     bookingStartTime,
//     bookingEndTime,
//     bookingDuration,
//     bookingTitle,
//     bookingDescription
//   };

const addBooking = async (request, response) => {
    const bookingData = request.body;
    console.log(bookingData);
    const newBooking = new Booking(bookingData);
    try {
        const data = await newBooking.save();
        await User.findByIdAndUpdate(bookingData.bookingUser, { $push: { bookings: data._id } });
        await Room.findByIdAndUpdate(bookingData.bookingRoomID, { $push: { roomBookings: data._id } });
        console.log(data);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: 'Error adding booking' });
    }
}




module.exports = { getBookings, deleteBookingByID, addBooking, getOnGoingBookings };