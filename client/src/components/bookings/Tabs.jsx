import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material';
import UpcomingBookings from '../user/UpcomingBookings';
import PastBookings from '../user/PastBookings';
import AvailableRooms from '../available/AvailableRooms';
import SyncIcon from '@mui/icons-material/Sync';
import { useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f57c00'
    }
  }
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const timeState = useSelector((state) => state.duration);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='tabs'>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Available' {...a11yProps(0)} />
              <Tab label='My Upcoming Bookings' {...a11yProps(1)} />
              <Tab label='My Past Bookings' {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {timeState.range && <AvailableRooms />}
            {!timeState.range && (
              <Box
                sx={{
                  width: '95%',
                  padding: '1rem',
                  maxHeight: '40vh',
                  overflowY: 'scroll'
                }}
              >
                <List sx={{ width: '100%' }}>
                  <div >
                    <ListItem disablePadding sx={{ width: '100%' }}>
                      <ListItemButton disableRipple>
                        <ListItemIcon>
                          <SyncIcon color='warning' />
                        </ListItemIcon>
                        <ListItemText primary='Please Check Availability Again...' />
                      </ListItemButton>
                    </ListItem>
                  </div>
                </List>
              </Box>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <UpcomingBookings />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <PastBookings />
          </CustomTabPanel>
        </Box>
      </ThemeProvider>
    </div>
  );
}
