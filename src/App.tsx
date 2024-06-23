import React, { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar  from './shared/components/Header/Header';
import { StyledEngineProvider } from '@mui/material';


function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <ResponsiveAppBar/>
        <main id='main'>
          <div className='custom-container'>
            <Outlet/>
          </div>
        </main>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
