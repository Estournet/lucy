import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import Decoration from './components/Decoration';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/" render={() => <Decoration />} />
        </Switch>

        {/*<Decoration />*/}
      </MuiThemeProvider>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
