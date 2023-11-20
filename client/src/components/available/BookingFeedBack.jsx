import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { roomsAction } from '../../store/roomsSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function BookingFeedBack() {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const dispatch = useDispatch();
  const addBookingsState = useSelector((state) => state.rooms);
  let severity = 'success';
  let message = 'Booking Added Succesfully !!';
  
  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };



  if (addBookingsState.addBookingTried) {
    handleClickSnackBar();
    dispatch(roomsAction.addBookingTriedAction(false));
  }

  if (addBookingsState.addBookingErrorFailed) {
    severity = 'error';
    message = addBookingsState.addBookingErrorMessage.message;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openSnackBar}
      autoHideDuration={3000}
      onClose={handleCloseSnackBar}
    >
      <Alert
        onClose={handleCloseSnackBar}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default BookingFeedBack;
