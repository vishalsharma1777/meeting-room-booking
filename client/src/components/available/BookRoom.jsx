import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dateConverter from '../../helperFunctions/dateConverter';
import ConfirmBooking from './ConfirmBooking';
import BookingFeedBack from './BookingFeedBack';

function BookRoom({ room }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [empty, setempty] = useState(true);

  const dispatch = useDispatch();
  const timeState = useSelector((state) => state.duration);
  const startTime = dateConverter(timeState.interval.startingTime);
  const endTime = dateConverter(timeState.interval.endingTime);

  let hours = timeState.hours;
  let minutes = timeState.minutes;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  useEffect(() => {
    if (title === '' || description === '') {
      setempty(true);
    }
    else{
      setempty(false)
    }
  }, [title, description]);

  return (
    <React.Fragment>
      <BookingFeedBack />
      <Button variant='contained' id={room._id} color='warning' onClick={handleClickOpen}>
        Book Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component={'span'}
        variant={'body2'}
      >
        <DialogTitle>
          <div className='roomTitle'>{room.roomName}</div>
        </DialogTitle>
        <DialogContent component={'span'} variant={'body2'}>
          <DialogContentText component={'span'} variant={'body2'}>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Room Number - </span>{' '}
              {room.roomNumber}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>On Floor - </span> {room.roomFloor}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Start Time - </span> {startTime}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>End Time - </span>
              {endTime}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Duration - </span> {hours} Hours{' '}
              {minutes} Minutes{' '}
            </p>
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Booking Title'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleTitleChange}
            required
          />
          <TextField
            margin='dense'
            id='description'
            label='Booking Description'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleDescriptionChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <ConfirmBooking
            room={room}
            title={title}
            description={description}
            disabled={empty}
            setDisabled={setempty}
            handleClose={handleClose}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default BookRoom;
