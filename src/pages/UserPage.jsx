import React from 'react';
import { Typography } from '@material-ui/core';
import UserStats from '../components/UserStats';
import ParsedData from '../utils/Parser';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Chart from '../components/Chart';
import Paper from '@material-ui/core/Paper/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide/Slide';

const UserPage = props => {
  const user = ParsedData.users.find(
    element => element.userName === props.match.params.userName
  );
  console.log(user);
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <div>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Paper className={props.classes.paper}>
              <Toolbar>
                <IconButton
                  className={props.classes.menuButton}
                  component={Link}
                  to="/"
                >
                  <ArrowBackIcon />
                </IconButton>
                <div className={props.classes.flexContainer}>
                  <div className={props.classes.flex}>
                    <Typography variant="headline">
                      {props.match.params.userName}
                    </Typography>
                    <Typography
                      noWrap
                      variant="subheading"
                      color="textSecondary"
                    >
                      {ParsedData.groupName}
                    </Typography>
                  </div>
                </div>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <UserStats user={user} />
              </Grid>
              <Grid item xs={12}>
                <Chart
                  data={user.messagesPerMonth}
                  label="Nombre de message"
                  defaultChart="line"
                  title="Nombre de messages au cours du temps"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
};

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'center'
  },
  flex: {
    flexGrow: 1
  },
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  paper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export default withStyles(styles)(UserPage);
