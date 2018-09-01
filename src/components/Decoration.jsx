import React from 'react';
import { Grid, withStyles } from '@material-ui/core/';
import Footer from './Footer.jsx';
import Content from '../components/AsyncContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Decoration = props => (
  <div className={props.classes.root}>
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="title" color="inherit">
              Lucy – Messenger statistics
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <main className={props.classes.content}>
          <Content />
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
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minHeight: '100vh'
  }
});

export default withStyles(styles, { withTheme: true })(Decoration);
