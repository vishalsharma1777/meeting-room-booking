import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SelectUser from './SelectUser';
import Favicon from 'react-favicon';
import SignInPage from './SigninPage';
import SignUpPage from './SignUpPage';

export default function StartingPage() {
  const [alignment, setAlignment] = React.useState('signin');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  

  return (
    <>
      <Favicon url='https://s3.ap-south-1.amazonaws.com/assets-91sb/favicon/64X64/91sb-favicon.ico'></Favicon>
      <div className='loginPage'>
        <div className='loginCard'>
          <div className='logo-with-toggle'>
            <img className='loginLogo' src='./logo.png' />

            <ToggleButtonGroup
              color='primary'
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label='Platform'
            >
              <ToggleButton value='signin'>Sign In</ToggleButton>
              <ToggleButton value='signup'>Sign Up</ToggleButton>
              <ToggleButton value='guest'>Guest</ToggleButton>
            </ToggleButtonGroup>
            <div className='form-divider'>
              {alignment == 'guest' && <SelectUser />}
              {alignment == 'signin' && <SignInPage />}
              {alignment == 'signup' && <SignUpPage />}
            </div>
          </div>
          <div className='disclaimer'>
            <p>
              By logging in you are accepting our
              <br />
              <a href='https://www.91springboard.com/member-terms-of-service'>
                {' '}
                Terms Of Service
              </a>{' '}
              &{' '}
              <a href='https://www.91springboard.com/member-privacy-policy'>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
