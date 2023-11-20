import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pastBookingsActions } from '../../store/pastSlice';
import { upcomingBookingsActions } from '../../store/upcomingSlice';
import { tableAction } from '../../store/tableSlice';
import { timeActions } from '../../store/timeSlice';
import { authorizationActions } from '../../store/authorizationSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const switchUser = () => {
    dispatch(pastBookingsActions.fetchPastBookings([]));
    dispatch(upcomingBookingsActions.fetchUpcomingBookings([]));
    dispatch(tableAction.searchDateDataAction([]));
    dispatch(timeActions.resetInterval());
    dispatch(authorizationActions.authLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // document.getElementById('videobackground').style.display = 'block';

    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='warning'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MeetingRoomIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            91 Spring Board Meeting Rooms
          </Typography>
          <Button color='inherit' onClick={switchUser}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
