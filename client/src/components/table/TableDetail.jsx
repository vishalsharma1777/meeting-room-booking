import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dateFinder } from '../../helperFunctions/timeAndDate';
import { timeFinder } from '../../helperFunctions/timeAndDate';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicTable({ details, setOpen }) {
  const title = details.customData.bookingRoomID.roomNumber;
  const name = details.customData.bookingRoomID.roomName;
  const onlyDate = dateFinder(details.start);
  const titleString = `${title} - ${name} - ${onlyDate}`;
  const from = timeFinder(details.start);
  const to = timeFinder(details.end);
  let bookedBy = ""
  if(details.customData.bookingUser.email === undefined){
   bookedBy= 'Guest';
  }
  else{
    bookedBy = details.customData.bookingUser.email;
  }

  const comment = details.customData.bookingTitle;
  return (
    <>
      <div className='table-header'>
        <span className='table-modal-heading'>{titleString}</span>

        <CloseIcon
          style={{
            cursor: 'pointer',
            color: 'black',
            fontSize: '2rem',
          }}
          onClick={() => setOpen(false)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>From</TableCell>
              <TableCell align='left'>To</TableCell>
              <TableCell align='left'>Booked By</TableCell>
              <TableCell align='left'>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='left'>{from}</TableCell>
              <TableCell align='left'>{to}</TableCell>
              <TableCell align='left'>{bookedBy}</TableCell>

              <TableCell align='left'>{comment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
