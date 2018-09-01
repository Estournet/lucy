import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import Decoration from './components/Decoration';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Decoration />
      </MuiThemeProvider>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
