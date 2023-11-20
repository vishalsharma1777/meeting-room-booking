import * as React from 'react';
import dayjs from 'dayjs';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useDispatch } from 'react-redux';
import { timeActions } from '../../store/timeSlice';

export default function Clock({setSelectedTime}) {
  const dispatch = useDispatch();
  const submitDate = (date) => {
    date = date.second(0);
    setSelectedTime(date);
    dispatch(timeActions.setRange(false));
  };

  const currentDate = dayjs();
  const nearest15Minute = currentDate.minute(
    currentDate.minute() + 15 - (currentDate.minute() % 15)
  );

  React.useEffect(() => {
    setSelectedTime(nearest15Minute);
  }, []);

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label htmlFor='time'>
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          outline: 'none'
        }}
      >
        <MobileDateTimePicker
          defaultValue={nearest15Minute}
          disablePast
          cursor='pointer'
          onAccept={submitDate}
          formatDensity='spacious'
          minutesStep={15}
          slotProps={{
            textField: {
              fullWidth: true,
              style: {
                width: '100%',
                border: '1px solid #f57c00',
                outline: 'none',
                borderRadius: '5px'
              }
            }
          }}
        />
        <DateRangeOutlinedIcon cursor='pointer' color='warning' fontSize='large'/>
      </div>
      </label>
    </LocalizationProvider>
  );
}
