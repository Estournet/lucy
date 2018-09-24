import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Slide from '@material-ui/core/Slide/Slide';
import Paper from '@material-ui/core/Paper/Paper';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import conversations from '../conversations';
import { convertUnicode } from '../utils/Formats';

const Homepage = props => (
  <Slide in direction="up" mountOnEnter unmountOnExit>
    <div className={props.classes.content}>
      <div className={props.classes.title}>
        <Typography
          variant="display2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Lucy
        </Typography>
        <Typography variant="headline" align="center" color="textPrimary">
          Messenger statistics
        </Typography>
      </div>
      <Grid container spacing={16}>
        {Object.keys(conversations)
          .sort()
          .map(conversationID => (
            <Grid item xs={12} sm={6} lg={3} xl={1} key={conversationID}>
              <Paper className={props.classes.paper}>
                <div className={props.classes.flexContainer}>
                  <div className={props.classes.flex}>
                    <Typography
                      variant="body2"
                      component={Link}
                      to={encodeURI(`/${conversationID}`)}
                      className={props.classes.textDecorationNone}
                    >
                      {convertUnicode(
                        conversations[conversationID].displayName
                      )}
                    </Typography>
                  </div>
                  <div>
                    <IconButton
                      className={props.classes.icon}
                      size="small"
                      component={Link}
                      to={encodeURI(`/${conversationID}`)}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </div>
  </Slide>
);

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexGrow: 1,
    alignItems: 'center'
  },
  flex: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minHeight: '100vh'
  },
  textDecorationNone: {
    textDecoration: 'none'
  }
});

export default withStyles(styles)(Homepage);
