import React, { useEffect } from 'react';
import { useState } from 'react';
import { validate } from 'react-email-validator';
import passwordValidator from 'password-validator';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SigninButton from '../components/userRegistration/SigninButton';
import LoginIssues from '../components/userRegistration/LoginIssues';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, SetSignInData] = useState({
    email: '',
    password: ''
  });

  const authState = useSelector((state) => state.authorization);

  const navigate = useNavigate();

  const resetPassword = () => {
    navigate('/forgot-password');
  };

  const handleChange = (prop) => (event) => {
    SetSignInData({ ...signInData, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  return (
    <>
      <form className='form-control'>
        <FormControl
          sx={{
            marginBottom: '10px',
            marginTop: '50px',
            width: '100%',
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
            error={signInData.email.length > 0 && !validate(signInData.email)}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {signInData.email.length > 0 &&
              !validate(signInData.email) &&
              'Please enter a valid email.'}
            {signInData.email.length > 0 &&
              validate(signInData.email) &&
              authState.status === 404 &&
              authState.error}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            sx={{
              width: '90%'
            }}
            autoComplete='off'
            placeholder='Password'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {signInData.password.length > 0 &&
              authState.status === 401 &&
              authState.error}
          </FormHelperText>
        </FormControl>

        <SigninButton signInData={signInData} disableButton={disableButton} />
        <div className='login-belowButtons'>
          <div className='reset-passwprd' onClick={resetPassword}>
            {' '}
            RESET PASSWORD
          </div>
          <div>|</div>
          <LoginIssues />
        </div>
      </form>
    </>
  );
}

export default SignInPage;
