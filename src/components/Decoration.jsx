import React from 'react';
import { Grid, withStyles } from '@material-ui/core/';
import Footer from './Footer.jsx';
import AsyncContent from '../components/AsyncContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Favicon from '../assets/logo.png';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ErrorCatcher from './ErrorCatcher';

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
              variant="title"
              color="inherit"
              component={Link}
              noWrap
              to="/"
              className={props.classes.title}
            >
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
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  title: {
    textDecoration: 'none'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    height: 28,
    width: 28
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minHeight: '100vh'
  }
});

export default withStyles(styles, { withTheme: true })(Decoration);
