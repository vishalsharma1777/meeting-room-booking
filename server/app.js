// Express
require('dotenv').config()
const server = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/usersRouter");
const rooms = require("./routes/roomsRouter");
const bookings = require("./routes/bookingsRouter");



//  DATABSE CONNECTION
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED");
});

// ROUTERS
const app = server();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", users);
app.use("/rooms", rooms);
app.use("/bookings", bookings)

// SERVER LISTENING
app.listen(3000, () => {
    console.log("Server Started on port 3000");
}); 