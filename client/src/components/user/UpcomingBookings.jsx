import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Booking from './Booking';
import DeleteBooking from './DeleteBooking';
import { fetchUserUpcomingBookings } from '../../api/usersApi';
import { upcomingBookingsActions } from '../../store/upcomingSlice';
import { jwtDecode } from 'jwt-decode';

function UpcomingBookings() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authorization);
  let userID = '';
  if (localStorage.getItem('token') === null) {
    userID = authState.userId;
  } else {
    userID = jwtDecode(localStorage.getItem('token')).id;
  }

  const upcomingState = useSelector((state) => state.upcomingBookings);

  useEffect(() => {
    dispatch(upcomingBookingsActions.upcomingLoadingAction(true));
    fetchUserUpcomingBookings(userID)
      .then((res) => {
        dispatch(upcomingBookingsActions.fetchUpcomingBookings(res.data));
        dispatch(upcomingBookingsActions.upcomingLoadingAction(false));
      })
      .catch((err) => {
        dispatch(upcomingBookingsActions.upcomingErrorAction(err));
        dispatch(upcomingBookingsActions.upcomingLoadingAction(false));
      });
  }, []);

  const upcomingBookings = upcomingState.upcomingBookingsArray;
  const sortedUpcomingBookings = [...upcomingBookings].sort((a, b) => {
    return new Date(a.bookingStartTime) - new Date(b.bookingStartTime);
  });

  return (
    <Box
      sx={{
        width: '95%',
        padding: '1rem',
        maxHeight: '45vh',
        overflowY: 'scroll'
      }}
    >
      <List sx={{ width: '100%' }}>
        {sortedUpcomingBookings.map((booking) => {
          return (
            <div key={booking._id}>
              <ListItem disablePadding sx={{ width: '95%' }}>
                <ListItemButton disableRipple>
                  <ListItemIcon>
                    <EventAvailableIcon color='warning' />
                  </ListItemIcon>
                  <Booking booking={booking} />
                  <DeleteBooking booking={booking} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Box>
  );
}

export default UpcomingBookings;
