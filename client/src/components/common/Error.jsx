import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Favicon from 'react-favicon';

function Error({message}) {
  const navigate = useNavigate();

  const switchUser = () => {
    navigate('/');
  };
  return (
    <>
      <Favicon url='https://s3.ap-south-1.amazonaws.com/assets-91sb/favicon/64X64/91sb-favicon.ico'></Favicon>
      <div className='loginPage'>
        <div className='errorCard'>
          <img className='errorLogo' src='../../../public/logo.png' />
          <div className='loginTitle'>{message}</div>
          <Button variant='contained' color='warning' onClick={switchUser}>
            Login
          </Button>
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

export default Error;
