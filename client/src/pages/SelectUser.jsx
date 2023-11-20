import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUserNames } from '../api/usersApi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { userNameActions } from '../store/userNameSlice';
import { authorizationActions } from '../store/authorizationSlice';
// import jwt from 'jsonwebtoken';

function SelectUser() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userName);
  const authState = useSelector((state) => state.authorization);

  useEffect(() => {
    dispatch(userNameActions.loading(true));
    fetchUserNames()
      .then((res) => {
        setTimeout(() => {
          dispatch(userNameActions.fetchUserName(res.data));
        }, 1000);
      })
      .catch((err) => {
        dispatch(userNameActions.error(err));
      });

    document.title = '91s Cowork | Guest ';
  }, [authState.loginSuccess]);

  //only first 5 users are shown in the dropdown
  let userData = state.userNameArray.slice(0, 5);


  const handleChange = (event) => {
    setUser(event.target.value);
    let name = userData.filter((user) => user._id === event.target.value);
    dispatch(
      authorizationActions.authSuccess({
        username: name[0].username,
        id: event.target.value
      })
    );

    navigate(`/user`);
  };

  if (state.error !== '') {
    return <h1>{state.error.message}</h1>;
  }

  return (
    <>
      <FormControl
        required
        sx={{ m: 1, width: '100%', marginTop: 6 }}
        color='warning'
      >
        <InputLabel id='demo-simple-select-required-label'>User</InputLabel>
        <Select
          labelId='demo-simple-select-required-label'
          id='demo-simple-select-required'
          value={user}
          label='User *'
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {state.loading ? (
            <CircularProgress />
          ) : (
            userData.map((user) => {
              return (
                <MenuItem key={user._id} value={user._id}>
                  {user.username.toUpperCase()}
                </MenuItem>
              );
            })
          )}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </>
  );
}

export default SelectUser;
