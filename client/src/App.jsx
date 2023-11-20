import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectUser from './pages/SelectUser';
import HomePage from './pages/HomePage';
import { ThemeProvider, createTheme } from '@mui/material';
import StartingPage from './pages/StartingPage';
import ResetPasword from './components/userRegistration/ResetPassword';
import Error from './components/common/Error';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f57c00'
      }
    }
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StartingPage/>} />
            <Route path='/forgot-password' element={<ResetPasword />} />
            <Route path='/user' element={<HomePage />} />
            <Route path='/user/:id' element={<HomePage />} />
            <Route path='*' element={<Error message={'Page not found'} />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
