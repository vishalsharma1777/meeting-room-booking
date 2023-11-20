const express = require("express");
const router = express.Router();

const { getBookings,addBooking,deleteBookingByID,getOnGoingBookings } = require("../controllers/bookingsController");

router.get("/allBookings", getBookings);
router.get("/onGoingBookings", getOnGoingBookings);
router.delete("/:userId/:id/delete", deleteBookingByID);
router.post("/addBooking", addBooking);


module.exports = router;