const { request, response } = require('express');
const User = require('../models/userSchema');
const Booking = require('../models/bookingSchema');
const Room = require('../models/roomSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()


const getUsers = (request, response) => {
  User.find()
    .populate({
      path: 'bookings'
    })
    .then((data) => {
      response.status(200);
      response.json(data);
    })
    .catch((error) => {
      response.status(500);
      response.json(error);

    });
}

const getUserNames = (request, response) => {
  User.find({}, { username: 1, _id: 1 })
    .then((data) => {
      response.status(200);
      response.json(data);
    })
    .catch((error) => {
      response.status(500);
      response.json(error);
    });
}

const getUserUpcomingBookings = (request, response) => {
  const { id } = request.params;
  Booking.find({
    bookingUser: id,
    bookingStartTime: { $gt: new Date() }
  }).populate('bookingUser').populate('bookingRoomID')
    .then((data) => {
      response.status(200);
      response.json(data);
    })
    .catch((error) => {
      response.status(500);
      response.json(error);
    });
}

const getUserPastBookings = (request, response) => {
  const { id } = request.params;
  Booking.find({
    bookingUser: id,
    bookingStartTime: { $lt: new Date() }
  }).populate('bookingUser').populate('bookingRoomID')
    .then((data) => {
      response.status(200);
      response.json(data);
    })
    .catch((error) => {
      response.status(500);
      response.json(error);
    });
}

const createUser = async(request, response) => {
  const { username, password, email } = request.body;
  console.log(username, password, email);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt, 10);
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    response.status(400);
    response.json({ error: "Email already in use" });
    return;
  }
  const user = new User({
    username: username,
    password: hashedPassword,
    email: email
  });
  console.log(hashedPassword);
  user.save()
    .then((data) => {
      response.status(200);
      response.json(data);
    })
    .catch((error) => {
      response.status(500);
      response.json(error);
    });
}

const loginUser = async(request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      console.log("password match");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      response.json({ token: token , id: user._id, username: user.username});
    } else {
      response.status(401);
      response.json({ error: "Invalid password" });
    }
  } else {
    response.status(404);
    response.json({ error: "No user with this email." });
  }

}







module.exports = { getUsers, getUserNames,loginUser, getUserUpcomingBookings, createUser, getUserPastBookings };