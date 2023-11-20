import React from 'react';
import { Button } from '@mui/material';
import { createUser } from '../../api/usersApi';
import { useDispatch, useSelector } from 'react-redux';
import { authorizationActions } from '../../store/authorizationSlice';
import { useNavigate } from 'react-router-dom';


function SignupButton({  details, disableButton }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.authorization);
  const signedUpData = {
    username: details.name,
    email: details.email,
    password: details.password
  };

  

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(signedUpData);

      if (response.status === 200) {
        dispatch(authorizationActions.signUpSuccess(response.data));
        navigate(`/`);
      }
    } catch (error) {
      console.log(error.response);
      dispatch(authorizationActions.signUpError(error.response));
    }
  };



  return (
    <Button
      id='signup-button'
      variant='contained'
      onClick={submit}
      disabled={disableButton}
      sx={{ width: '90%', marginTop: '20px', marginBottom: '20px' }}
    >
      Sign Up
    </Button>
  );
}

export default SignupButton;
