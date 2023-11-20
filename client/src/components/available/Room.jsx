import * as React from 'react';
import { ListItemText } from '@mui/material';

function Room({ room }) {
  const roomName = `${room.roomNumber} | ${room.roomName}`;
  let roomDescription = '';
  if (room.roomFormal) {
    roomDescription = `Formal ${room.roomType} Room | ${room.roomCapacity} seater`;
  } else {
    roomDescription = `Informal ${room.roomType} Room | ${room.roomCapacity} seater`;
  }
  return (
    <React.Fragment>
      <ListItemText primary={roomName} secondary={roomDescription} />
    </React.Fragment>
  );
}

export default Room;
