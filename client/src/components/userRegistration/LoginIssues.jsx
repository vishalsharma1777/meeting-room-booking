import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Stack } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function LoginIssues() {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState('panel2');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className='login-issues' onClick={handleClickOpen}>
        LOGIN ISSUES?
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          <Stack direction='row' spacing={1}>
            <WarningAmberIcon sx={{ fontSize: '2rem', marginRight: '5px' }} />
            <Typography variant='h6' component='div'>
              Login Issues
            </Typography>
          </Stack>
          <Typography variant='body2' color='text.secondary'>
            We hate the fact that you're facing trouble logging in. Don't worry
            though, we have a solution and the reason that may be facing this
            issue:
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                aria-controls='panel1d-content'
                id='panel1d-header'
              >
                <Typography>Cookies Disabled</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  How do I fix it? 
                  <br/>
                  This issue occurs because you haven't enabled
                  cookies on your browser. To enable cookies, follow the steps
                    below:
                    <br/>
                    <br/>
                    <b>Chrome</b>
                    <br/>
                    <br/>
                    1. Open Chrome.
                    <br/>
                    2. At the top right, click More Settings.
                    <br/>
                    3. At the bottom, click Advanced.
                    <br/>
                    4. Under 'Privacy and security', click Site settings.
                    <br/>
                    5. Click Cookies.
                    <br/>
                    6. Turn Cookies on or off.
                    <br/>
                    <br/>
                    
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <AccordionSummary
                aria-controls='panel2d-content'
                id='panel2d-header'
              >
                <Typography>
                  Forgot Password / Set Password Link Expired
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  No worries! There's a Reset Password button beside login
                  issues button you just clicked. Just close this window and
                  click on the Reset Password option. Enter your registered
                  email to get a reset link. It's as simple as that! 🙂
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <AccordionSummary
                aria-controls='panel3d-content'
                id='panel3d-header'
              >
                <Typography>Remove Adblocker</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Kindly disable or remove adblock in order to access Cowork.🙂
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
