import ResponsiveDateTimePickers from './clock';
import HoursAndMinutes from './HoursAndMinutes';
import React, { useEffect, useState } from 'react';
import { Button, duration } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { timeActions } from '../../store/timeSlice';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import Clock from './clock';
import { fetchSearchDateRooms } from '../../api/roomsApi';
import { tableAction } from '../../store/tableSlice';

function CheckAvailability() {
  const [userName, setUserName] = useState('');

  const currentDate = dayjs();
  const durationState = useSelector((state) => state.duration);
  const authState = useSelector((state) => state.authorization);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const dispatch = useDispatch();

  const resetTable = () => {
    fetchSearchDateRooms(new Date(durationState.interval.startingTime))
      .then((res) => {
        dispatch(tableAction.searchDateDataAction(res.data));
      })
      .catch((err) => {
        dispatch(tableAction.searchDateDataErrorAction(err));
      });
  };

  const intervals = hours * 60 + +minutes;
  const endingTime = new Date(selectedTime + intervals * 60000);

  const payload = {
    startingTime: new Date(selectedTime),
    endingTime: endingTime
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setUserName(authState.username);
    } else {
      setUserName(localStorage.getItem('user'));
    }
  }, []);

  const handleCheckAvailability = () => {
    dispatch(timeActions.setInterval(payload));
    dispatch(timeActions.setHours(hours));
    dispatch(timeActions.setMinutes(minutes));
    dispatch(timeActions.setRange(true));
    resetTable();
  };
  if (durationState.range) {
    resetTable();
  }

  return (
    <div className='book-room'>
      <div className='title-book-room'>
        Booking as <span className='booker'>{userName.toUpperCase()} </span>
      </div>
      <div>
        <Typography variant='h6'>Select Date and Time</Typography>
        <Clock selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </div>
      <HoursAndMinutes
        minutes={minutes}
        hours={hours}
        setMinutes={setMinutes}
        setHours={setHours}
      />
      <Button
        variant='contained'
        onClick={handleCheckAvailability}
        sx={{
          '&.Mui-disabled': {
            background: '#ffb74d',
            color: 'white'
          }
        }}
        style={{ width: '100%' }}
        color='warning'
      >
        Check Availability
      </Button>
    </div>
  );
}

export default CheckAvailability;
