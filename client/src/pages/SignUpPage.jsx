import React from 'react';
import { useState, useEffect } from 'react';
import { validate } from 'react-email-validator';
import passwordValidator from 'password-validator';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SignupButton from '../components/userRegistration/SignupButton';
import LoginIssues from '../components/userRegistration/LoginIssues';
import { useDispatch, useSelector } from 'react-redux';

var schema = new passwordValidator();
schema
  .is()
  .min(8, 'password should have atleast 8 characters')
  .is()
  .max(100)
  .has()
  .uppercase(1, 'password should have atleast 1 Uppercase char')
  .has()
  .lowercase(1, 'password should have atleast 1 Lowercase char')
  .has()
  .digits(1, 'password should have atleast 1 Digit')
  .has()
  .not()
  .spaces(0, 'it should not have spaces');

function SignUpPage() {
  const authState = useSelector((state) => state.authorization);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  let passwordValidationMessage = schema.validate(formData.password, {
    details: true
  });
  let passwordValidation = schema.validate(formData.password);

  let disableButton = true;
  if (
    formData.name.length > 0 &&
    formData.email.length > 0 &&
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    validate(formData.email) &&
    formData.password === formData.confirmPassword &&
    passwordValidation
  ) {
    disableButton = false;
  }

  useEffect(() => {
    document.title = '91s Cowork | Sign Up ';
  }, []);

  return (
    <>
      <form className='form-control'>
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
            placeholder='Name'
            sx={{
              width: '90%'
            }}
            onChange={handleChange('name')}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.name.length > 0 &&
              formData.name.length < 2 &&
              'Please enter a valid name.'}
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
            placeholder='Email'
            sx={{
              width: '90%'
            }}
            onChange={handleChange('email')}
            error={formData.email.length > 0 && !validate(formData.email)}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.email.length > 0 &&
              !validate(formData.email) &&
              'Please enter a valid email.'}
            {formData.email.length > 0 &&
              validate(formData.email) &&
              authState.signUpStatus === 400 &&
              authState.signUpError}
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
            error={formData.password.length > 0 && !passwordValidation}
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
            {formData.password.length > 0 &&
              !passwordValidation &&
              passwordValidationMessage[0].message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            id='outlined-adornment-confirm-password'
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={handleChange('confirmPassword')}
            sx={{
              width: '90%'
            }}
            autoComplete='off'
            placeholder='Confirm Password'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge='end'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.password !== formData.confirmPassword &&
            formData.confirmPassword.length > 0
              ? 'Both should be same.'
              : ''}
          </FormHelperText>
        </FormControl>

        <SignupButton details={formData} disableButton={disableButton} />
      </form>
    </>
  );
}

export default SignUpPage;
