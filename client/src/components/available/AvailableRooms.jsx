import { roomsAction } from '../../store/roomsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import Room from './Room';
import BookRoom from './BookRoom';
import { fetchAllAvailableRooms } from '../../api/roomsApi';
// import { roomsAction } from '../../store/roomsSlice';


function AvailableRooms() {
  const timeState = useSelector((state) => state.duration);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  

  useEffect(() => {
    dispatch(roomsAction.availabiltyLoading(true));
    fetchAllAvailableRooms(
      timeState.interval.startingTime,
      timeState.interval.endingTime
    ).then((res) => {
      dispatch(roomsAction.fetchAvailableRooms(res.data));
    });
  }, [timeState.interval.startingTime, timeState.interval.endingTime]);

  const availableRooms = rooms.currentAvailableRooms;
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
        {rooms.availabiltyLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            }}
          >
            {' '}
            <CircularProgress />
          </Box>
        )}
        {!rooms.availabiltyLoading &&
          availableRooms.map((room) => {
            return (
              <div key={room._id}>
                <ListItem disablePadding sx={{ width: '100%' }}>
                  <ListItemButton disableRipple>
                    <ListItemIcon>
                      <EventAvailableOutlinedIcon color='warning' />
                    </ListItemIcon>
                    <Room room={room} />
                    <BookRoom room={room} />
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

export default AvailableRooms;
