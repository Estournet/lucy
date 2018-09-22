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
    <div>
      <Typography
        variant="display2"
        align="center"
        color="textPrimary"
        className={props.classes.title}
      >
        Lucy – Messenger statistics
      </Typography>
      <Grid container spacing={16}>
        {Object.keys(conversations)
          .sort()
          .map(conversationID => (
            <Grid item xs={4} key={conversationID}>
              <Paper className={props.classes.paper}>
                <div className={props.classes.flexContainer}>
                  <div className={props.classes.flex}>
                    <Typography variant="body2">
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
  }
});

export default withStyles(styles)(Homepage);
