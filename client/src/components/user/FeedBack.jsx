import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { upcomingBookingsActions } from '../../store/upcomingSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function FeedBack() {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const dispatch = useDispatch();
  const upcomingBookingsState = useSelector((state) => state.upcomingBookings);
  let severity = 'success';
  let message = 'Booking Cancelled Succesfully !!';
  
  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };



  if (upcomingBookingsState.cancelationTried) {
    handleClickSnackBar();
    dispatch(upcomingBookingsActions.cancelationTriedAction(false));
  }

  if (upcomingBookingsState.cancelingErrorFailed) {
    severity = 'error';
    message = upcomingBookingsState.cancelingErrorMessage.message;
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

export default FeedBack;
