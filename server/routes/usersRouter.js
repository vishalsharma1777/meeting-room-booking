const express = require("express");
const router = express.Router();

const { getUsers,getUserNames,loginUser,getUserUpcomingBookings ,createUser,getUserPastBookings} = require("../controllers/usersController");

router.get("/allUsers", getUsers);
router.get("/userNames", getUserNames);
router.get("/:id/upcomingBookings", getUserUpcomingBookings);
router.get("/:id/pastBookings", getUserPastBookings);
router.post("/createUser", createUser);
router.post("/login", loginUser);

module.exports = router;