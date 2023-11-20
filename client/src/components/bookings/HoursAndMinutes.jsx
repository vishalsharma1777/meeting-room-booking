import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { timeActions } from '../../store/timeSlice';
import { useDispatch } from 'react-redux';

const style = {
  width: '100%',
  height: '100%',
  border: '1px solid #f57c00'
};

export default function HoursAndMinutes({
  minutes,
  hours,
  setMinutes,
  setHours
}) {
  const dispatch = useDispatch();

  const handleHours = (event, newHours) => {
    setHours(newHours);
    dispatch(timeActions.setRange(false));
  };
  const handleMinutes = (event, newMinutes) => {
    setMinutes(newMinutes);
    dispatch(timeActions.setRange(false));
  };
  return (
    <Stack direction='column' spacing={1}>
      <div>
        <Typography variant='h6'>Hours</Typography>
        <ToggleButtonGroup
          value={hours}
          style={{ width: '100%' }}
          exclusive
          color='warning'
          onChange={handleHours}
        >
          <ToggleButton style={style} value={0}>
            0
          </ToggleButton>
          <ToggleButton style={style} value={1}>
            1
          </ToggleButton>
          <ToggleButton style={style} value={2}>
            2
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div>
        <Typography variant='h6'>Minutes</Typography>

        <ToggleButtonGroup
          value={minutes}
          style={{ width: '100%' }}
          color='warning'
          exclusive
          onChange={handleMinutes}
        >
          <ToggleButton style={style} value={0}>
            0
          </ToggleButton>
          <ToggleButton style={style} value={15}>
            15
          </ToggleButton>
          <ToggleButton style={style} value={30}>
            30
          </ToggleButton>
          <ToggleButton style={style} value={45}>
            45
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Stack>
  );
}
