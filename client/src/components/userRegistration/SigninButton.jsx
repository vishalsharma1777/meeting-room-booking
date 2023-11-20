import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { loginUser } from '../../api/usersApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authorizationActions } from '../../store/authorizationSlice';

function SigninButton({ signInData, disableButton }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userState = useSelector((state) => state.authorization);

  const data = {
    email: signInData.email,
    password: signInData.password
  };
  const submit = async () => {
    try {
      const response = await loginUser(data);

      if (response.status === 200) {
        dispatch(authorizationActions.authSuccess(response.data));
        axios.defaults.headers.common['Authorization'] = response.data.token;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);
        navigate(`/user`);
      }
    } catch (error) {
      console.log(error.response);
      dispatch(authorizationActions.authFail(error.response));
    }
  };

  return (
    <Button
      id='signin-button'
      variant='contained'
      onClick={submit}
      disabled={disableButton}
      sx={{ width: '90%', marginTop: '20px', marginBottom: '20px' }}
    >
      Sign In
    </Button>
  );
}

export default SigninButton;
