/*
 * Lucy - Messenger statistics
 * Copyright (C) 2018 Vincent M
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import Decoration from "./components/Decoration";
import Homepage from "./pages/Homepage";

const App = () => (
  <BrowserRouter basename={process.env.NODE_ENV === "production" ? "lucy" : ""}>
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/" render={() => <Decoration />} />
        </Switch>
      </MuiThemeProvider>
    </>
  </BrowserRouter>
);

export default App;
