const { request, response } = require('express');
const Room = require('../models/roomSchema');
const Booking = require('../models/bookingSchema');
const User = require('../models/userSchema');
const dayjs = require('dayjs');
const getRooms = (request, response) => {
  Room.find()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

const bookingsOfParticularDate = async (request, response) => {
  const searchDate = new Date(request.headers.searchdate);
  searchDate.setHours(0, 0, 0, 0);
  console.log(searchDate);
  console.log(request.url);
  Booking.find({
    bookingStartTime: { $gte: searchDate },
    bookingEndTime: { $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) },
  })
  .populate({
    path: 'bookingRoomID',
    populate: {
      path: 'roomBookings'
    }
  })
  .populate({
    path: 'bookingUser',
    select: 'username email',
  })
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });

  
}
const currentDate = dayjs();
  const nearest15Minute = currentDate.minute(
    currentDate.minute() + 15 - (currentDate.minute() % 15)
  );
const getAllCurrentAvailableRooms = (request, response) => {
  Booking.find({
    bookingStartTime: { $lt: nearest15Minute.toISOString() },
    bookingEndTime: { $gt: nearest15Minute.toISOString() },
  })
    .then((data) => {
      const bookedRooms = data.map((item) => item.bookingRoomID);
      Room.find({
        _id: { $nin: bookedRooms },
      })
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

const getAvailableRooms = (request, response) => {
  const startingTime = (new Date(request.headers.startingtime));
  const endingTime = (new Date(request.headers.endingtime));
  console.log(request.url);
  Booking.find({
    $or: [
      {
        bookingStartTime: { $lt: endingTime },
        bookingEndTime: { $gt: startingTime }
      },
      {
        bookingStartTime: { $lt: endingTime },
        bookingEndTime: { $gt: endingTime }
      }]
  }).then((data) => {
    const bookedRooms = data.map((item) => item.bookingRoomID);
    Room.find({
      _id: { $nin: bookedRooms },
    })
      .then((data) => {
        response.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }
  );
}




module.exports = { getRooms, getAllCurrentAvailableRooms, bookingsOfParticularDate, getAvailableRooms };