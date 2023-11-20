import React, { useEffect } from 'react';
import { useState } from 'react';
import { validate } from 'react-email-validator';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import Favicon from 'react-favicon';
import { useNavigate } from 'react-router-dom';

function ResetPasword() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, SetSignInData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const resetPassword = () => {
    navigate('/forgot-password');
  };
  const login = () => {
    navigate('/');
  };

  const handleChange = (prop) => (event) => {
    SetSignInData({ ...signInData, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(signInData);
  };

  useEffect(() => {
    document.title = '91s Cowork | Sign In ';
  }, []);

  let disableButton = true;
  if (
    signInData.email.length > 0 &&
    signInData.password.length > 0 &&
    validate(signInData.email)
  ) {
    disableButton = false;
  }

  useEffect(() => {
    document.title = '91s Cowork | Reset Password';
  }
  , []);

  return (
    <>
      <Favicon url='https://s3.ap-south-1.amazonaws.com/assets-91sb/favicon/64X64/91sb-favicon.ico'></Favicon>
      <div className='loginPage'>
        <div className='loginCard'>
          <div className='logo-with-toggle'>
            <img className='loginLogo' src='./logo.png' />

            <div className='login-title'>
              <h6>Reset Password</h6>
            </div>

            <form onSubmit={submit} className='form-control'>
              <FormControl
                sx={{
                  marginBottom: '10px',
                  marginTop: '50px',
                  width: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Input
                  placeholder='Email'
                  sx={{
                    width: '90%'
                  }}
                  onChange={handleChange('email')}
                  error={
                    signInData.email.length > 0 && !validate(signInData.email)
                  }
                />
                <FormHelperText
                  sx={{ color: 'red', width: '90%', height: '10px' }}
                >
                  {signInData.email.length > 0 &&
                    !validate(signInData.email) &&
                    'Please enter a valid email.'}
                </FormHelperText>
              </FormControl>
            </form>
            <Button
              style={{
                marginTop: '20px',
                marginBottom: '20px',
                width: '70%'
              }}
              variant='contained'
              color='primary'
              disableElevation
              onClick={resetPassword}
            >
              SEND RESET LINK
            </Button>

            <Button
              style={{
                marginTop: '20px',
                marginBottom: '20px',
                width: '70%',
                backgroundColor: 'grey'
              }}
              variant='contained'
              onClick={login}
              disableElevation
            >
              LOGIN
            </Button>
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

export default ResetPasword;
