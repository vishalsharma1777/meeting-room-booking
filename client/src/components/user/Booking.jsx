import * as React from 'react';
import { ListItemText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dateConverter from '../../helperFunctions/dateConverter';

function Booking({ booking }) {
  
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const roomName = `${booking.bookingRoomID.roomNumber} | ${booking.bookingRoomID.roomName}`;
  let roomDescription = '';
  if (booking.bookingRoomID.roomFormal) {
    roomDescription = `Formal ${booking.bookingRoomID.roomType} Room | ${booking.bookingRoomID.roomCapacity} seater`;
  } else {
    roomDescription = `Informal ${booking.bookingRoomID.roomType} Room | ${booking.bookingRoomID.roomCapacity} seater`;
  }

  let hours = Math.floor(booking.bookingDuration / 60);
  let minutes = booking.bookingDuration % 60;
  let startTime = dateConverter(booking.bookingStartTime);
  let endTime = dateConverter(booking.bookingEndTime);
  
  let bookingData = `${startTime} - ${endTime.slice(-8)}`


  return (
    <React.Fragment>
      <ListItemText
        primary={roomName}
        onClick={handleClickOpen}
        secondary={bookingData} 
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Booking Details'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' component={'span'} variant={'body2'}>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Title - </span>{' '}
              {booking.bookingTitle}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Description - </span>{' '}
              {booking.bookingDescription}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Room - </span> {roomName}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Start Time - </span> {startTime}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>End Time - </span> {endTime}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Duration - </span> {hours} Hours{' '}
              {minutes} Minutes{' '}
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default Booking;
