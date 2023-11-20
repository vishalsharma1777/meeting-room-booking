import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Booking from './Booking';
import { fetchUserPastBookings } from '../../api/usersApi';
import { pastBookingsActions } from '../../store/pastSlice';
import { jwtDecode } from 'jwt-decode';

function PastBookings() {
  const dispatch = useDispatch();
  const pastState = useSelector((state) => state.pastBookings);
  const authState = useSelector((state) => state.authorization);
  console.log(authState);

  let id = '';
  if (localStorage.getItem('token') === null) {
    id = authState.userId;
  } else {
    id = jwtDecode(localStorage.getItem('token')).id;
  }

  console.log(id);
  useEffect(() => {
    dispatch(pastBookingsActions.pastLoadingAction(true));
    fetchUserPastBookings(id)
      .then((res) => {
        if (res.status == 200) {
          dispatch(pastBookingsActions.fetchPastBookings(res.data));
          dispatch(pastBookingsActions.pastLoadingAction(false));
        } else {
          dispatch(pastBookingsActions.pastErrorAction(res.error));
          dispatch(pastBookingsActions.pastLoadingAction(false));
        }
      })
      .catch((err) => {
        dispatch(pastBookingsActions.pastErrorAction(err));
        dispatch(pastBookingsActions.pastLoadingAction(false));
      });
  }, []);

  const pastBookings = pastState.pastBookingsArray;

  const sortedPastBookings = [...pastBookings].sort((a, b) => {
    return new Date(b.bookingStartTime) - new Date(a.bookingStartTime);
  });

  return (
    <Box
      sx={{
        width: '95%',
        padding: '1rem',
        height: '40vh',
        overflowY: 'scroll'
      }}
    >
      <List sx={{ width: '100%' }}>
        {sortedPastBookings.map((booking) => {
          return (
            <div key={booking._id}>
              <ListItem disablePadding sx={{ width: '100%' }}>
                <ListItemButton disableRipple>
                  <ListItemIcon>
                    <EventBusyIcon color='warning' />
                  </ListItemIcon>
                  <Booking booking={booking} />
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

export default PastBookings;
