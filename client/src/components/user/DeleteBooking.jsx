import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteBookingByID } from '../../api/bookingsApi';
import { useDispatch } from 'react-redux';
import { upcomingBookingsActions } from '../../store/upcomingSlice';
import FeedBack from './FeedBack';

function DeleteBooking({ booking }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const bookingID = booking._id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelBooking = () => {
    setOpen(false);
    document.getElementById(bookingID).disabled = true;
    document.getElementById(bookingID).innerHTML = 'Canceling';
    document.getElementById(bookingID).style.backgroundColor = 'grey';
    deleteBookingByID(bookingID, booking.bookingUser._id)
    .then((res) => {
        setTimeout(() => {
          dispatch(upcomingBookingsActions.cancelBooking(bookingID));
          dispatch(upcomingBookingsActions.cancelationTriedAction(true));
        }, 3000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.log(err);
          document.getElementById(bookingID).disabled = false;
          document.getElementById(bookingID).innerHTML = 'Cancel';
          document.getElementById(bookingID).style.backgroundColor = '#ed6c02';
          dispatch(upcomingBookingsActions.cancelingErrorAction(err));
          dispatch(upcomingBookingsActions.cancelationTriedAction(true));

        }, 3000);
      });
  };

  return (
    <React.Fragment>
      <FeedBack />
      <Button
        id={bookingID}
        disableRipple
        variant='contained'
        color='warning'
        onClick={handleClickOpen}
      >
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Cancel Booking?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            By clicking Yes, you are confirming that you would like to cancel
            your booking for{' '}
            <span className='detailKeys'>
              {' '}
              {booking.bookingRoomID.roomName}
            </span>
            . This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleCancelBooking} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteBooking;
