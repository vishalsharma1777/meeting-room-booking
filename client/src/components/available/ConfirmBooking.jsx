import { Button } from '@mui/material';
import React from 'react';
import dateConverter from '../../helperFunctions/dateConverter';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import {addBooking} from '../../api/bookingsApi';
import { roomsAction } from '../../store/roomsSlice';
import {jwtDecode} from "jwt-decode";


function ConfirmBooking({ room, handleClose, title, description, disabled }) {
  const dispatch = useDispatch();

  const timeState = useSelector((state) => state.duration);
  const authState = useSelector((state) => state.authorization);
  const startTime = dayjs(timeState.interval.startingTime);
  // const bookingUser = jwtDecode(localStorage.getItem('token')).id
  let bookingUser = '';
  if (localStorage.getItem('token') === null) {
    bookingUser = authState.userId;
  } else {
    bookingUser = jwtDecode(localStorage.getItem('token')).id;
  }
  const bookingRoomID = room._id;
  const bookingStartTime = startTime.second(0).millisecond(0).toISOString();
  const bookingEndTime = startTime
    .add(timeState.hours * 60 * 60 + timeState.minutes * 60, 'seconds')
    .second(0)
    .millisecond(0)
    .toISOString();
  const bookingDuration = timeState.hours * 60 + timeState.minutes;
  const bookingTitle = title;
  const bookingDescription = description;

  const bookingData = {
    bookingUser,
    bookingRoomID,
    bookingStartTime,
    bookingEndTime,
    bookingDuration,
    bookingTitle,
    bookingDescription
  };

  const handleConfirm = () => {
    handleClose();
    document.getElementById(room._id).disabled = true;
    document.getElementById(room._id).innerHTML = 'Booking';
    document.getElementById(room._id).style.backgroundColor = 'grey';
    addBooking(bookingData)
    .then((res) => {
        setTimeout(() => {
          dispatch(roomsAction.addBookingAction(res.data));
          dispatch(roomsAction.addBookingTriedAction(true));
        }, 3000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.log(err);
          document.getElementById(room._id).disabled = false;
          document.getElementById(room._id).innerHTML = 'Book Room';
          document.getElementById(room._id).style.backgroundColor = '#ed6c02';
          dispatch(roomsAction.addBookingErrorAction(err));
          dispatch(roomsAction.addBookingTriedAction(true));

        }, 3000);
      });
  };

  return (
    <Button id="confirmBooking" disabled={disabled} onClick={handleConfirm}>
      Confirm
    </Button>
  );
}

export default ConfirmBooking;
