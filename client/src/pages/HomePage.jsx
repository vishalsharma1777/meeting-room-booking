import Loading from '../components/common/Loading';
import CheckAvailability from '../components/bookings/CheckAvailability';
import FullWidthTabs from '../components/bookings/Tabs';
import ButtonAppBar from '../components/common/Navbar';
import Favicon from 'react-favicon';
import { fetchAllCurrentAvailableRooms } from '../api/roomsApi';
import SyncIcon from '@mui/icons-material/Sync';
import { useEffect } from 'react';
import TimelineComponent from '../components/table/TimeLine';
import { fetchRooms } from '../api/roomsApi';
import { useDispatch, useSelector } from 'react-redux';
import { roomsAction } from '../store/roomsSlice';
import Error from '../components/common/Error';

function HomePage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authorization);

  if(authState.loginSuccess === false){
    return (
      <Error message='Please Login Again' />
      
    )
  }

  const roomsState = useSelector((state) => state.rooms);
  useEffect(() => {
    dispatch(roomsAction.availabiltyLoading(true));
    fetchAllCurrentAvailableRooms()
      .then((res) => {
        setTimeout(() => {
          dispatch(roomsAction.fetchAvailableRooms(res.data));
        }, 0);
      })
      .catch((err) => {
        setTimeout(() => {
          dispatch(roomsAction.availabiltyError(err));
        }, 0);
      });
  }, []);

  useEffect(() => {
    fetchRooms()
      .then((res) => {
        dispatch(roomsAction.fetchRooms(res.data));
      })
      .catch((err) => {
        dispatch(roomsAction.error(err));
      });
    document.title = '91s Cowork | Bookings';
    // document.getElementById('videobackground').style.display = 'none';
    // document.getElementById('root').style.background = 'white';
  }, []);

  


  return (
    <>
      <Favicon url='https://s3.ap-south-1.amazonaws.com/assets-91sb/favicon/64X64/91sb-favicon.ico'></Favicon>
      <div>
        <ButtonAppBar />
        <div className='booking-container'>
          <CheckAvailability />
          <FullWidthTabs />
        </div>
        {roomsState.loading && <Loading />}

        {roomsState.error && <div>{roomsState.error}</div>}
        {!roomsState.loading && !roomsState.error && (
          <div className='timeline-class'>
            <div className='table-sync'>
              <SyncIcon color='warning' style={{ cursor: 'pointer' ,
            fontSize:'2rem' }} />
            </div>
            <TimelineComponent />
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
