const express = require("express");
const router = express.Router();

const { getRooms,getAllCurrentAvailableRooms ,bookingsOfParticularDate,getAvailableRooms} = require("../controllers/roomsController");

router.get("/allRooms", getRooms);
router.get("/allCurrentAvailableRooms", getAllCurrentAvailableRooms);
router.get("/availableRooms", getAvailableRooms);
router.get("/bookingsOfParticularDate", bookingsOfParticularDate);

module.exports = router;


