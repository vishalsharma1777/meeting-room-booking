import React, { useEffect, useState } from 'react';
import '../../timeline.css';
import 'vis-timeline/styles/vis-timeline-graph2d.css'; // Change the style import
import { Timeline } from 'vis-timeline/standalone'; //
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BasicTable from './TableDetail';

function TimelineComponent() {
  const [clickedItemData, setClickedItemData] = useState(null);
  const durationState = useSelector((state) => state.duration);
  const tableState = useSelector((state) => state.table);
  const roomsState = useSelector((state) => state.rooms);
  const timeState = useSelector((state) => state.duration);
  const upcomingState = useSelector((state) => state.upcomingBookings);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  
  useEffect(() => {
    var container = document.getElementById('visualization');
    if(container===null) return('Loading...');
    container.innerHTML = '';

    const roomDetails = roomsState.roomsArray.map((room) => {
      return {
        id: room._id,
        content: room.roomName
      };
    });

    const scheduleDetails = tableState.searchDateData;

    var schedule = scheduleDetails.map((schedule) => {
      return {
        id: schedule._id,
        group: schedule.bookingRoomID._id,
        start: schedule.bookingStartTime,
        end: schedule.bookingEndTime,
        content: 'Booked',
        customData: schedule
      };
    });

    const tableStartTime = new Date(
      durationState.interval.startingTime
    ).setHours(0, 0, 0, 0);
    const tableEndTime = new Date(tableStartTime + 24 * 60 * 60 * 1000);

    var options = {
      stack: false,
      min: tableStartTime,
      max: tableEndTime,
      start: tableStartTime,
      end: tableEndTime,
      margin: {
        item: 20,
        axis: 10
      },

      orientation: 'bottom'
    };

    const timeline = new Timeline(container, null, options);
    timeline.setGroups(roomDetails);
    timeline.setItems(schedule);

    timeline.on('click', function (properties) {
      const clickedItem = properties.item;
      if (!clickedItem) return;
      const clickedItemData = schedule.find((item) => item.id === clickedItem);
      setClickedItemData(clickedItemData);
      setOpen(true);
    });
  }, [timeState.interval.startingTime, tableState.searchDateData.length]);

  return (
    <div>
      <div id='visualization'></div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={'md'}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText
              id='alert-dialog-description'
              component={'span'}
              variant={'body2'}
            >
              {clickedItemData && (
                <BasicTable details={clickedItemData} setOpen={setOpen} />
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default TimelineComponent;
