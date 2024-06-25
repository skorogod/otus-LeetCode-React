import React, { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar  from './shared/components/Header/Header';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';


function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <div className="App">
          <ResponsiveAppBar/>
          <main id='main'>
            <div className='custom-container'>
              <Outlet/>
            </div>
          </main>
        </div>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
