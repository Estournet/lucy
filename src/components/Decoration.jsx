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
import { Grid, withStyles } from "@material-ui/core/";
import Footer from "./Footer.jsx";
import AsyncContent from "../components/AsyncContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Favicon from "../assets/logo.png";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ErrorCatcher from "./ErrorCatcher";

const Decoration = props => (
  <div className={props.classes.root}>
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar variant="dense" className={props.classes.flexContainer}>
            <Avatar
              alt="Website icon"
              src={Favicon}
              className={props.classes.avatar}
              component={Link}
              to="/"
            />
            <Typography
              variant="h6"
              color="inherit"
              component={Link}
              noWrap
              to="/"
              className={props.classes.title}>
              Lucy – Messenger statistics
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <main className={props.classes.content}>
          <ErrorCatcher>
            <AsyncContent />
          </ErrorCatcher>
        </main>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  </div>
);

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: "relative",
    display: "flex",
    width: "100%"
  },
  title: {
    textDecoration: "none"
  },
  flexContainer: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing.unit,
    height: 28,
    width: 28
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minHeight: "100vh"
  }
});

export default withStyles(styles, { withTheme: true })(Decoration);
