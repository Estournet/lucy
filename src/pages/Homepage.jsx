import React from 'react';
import { Typography } from '@material-ui/core';
import Stats from '../components/Stats';
import ParsedData from '../utils/Parser';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Chart from '../components/Chart';
import Members from '../components/Members';
import Slide from '@material-ui/core/Slide/Slide';

const Homepage = props => (
  <Slide in direction="up" mountOnEnter unmountOnExit>
    <div>
      <Typography
        variant="display1"
        align="center"
        color="textPrimary"
        className={props.classes.title}
      >
        {ParsedData.groupName}
      </Typography>
      <Grid container spacing={32}>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Members usersName={ParsedData.users.map(user => user.userName)} />
        </Grid>
        <Grid item xs={12}>
          <Stats />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={ParsedData.messageCountPerUser}
            label="Nombre de messages"
            defaultChart="bar"
            title="Nombre de messages total"
          />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={ParsedData.charCountPerUser}
            label="Nombre de caractères"
            defaultChart="bar"
            title="Nombre de caractères total"
          />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={ParsedData.messagesPerMonth}
            label="Nombre de messages"
            defaultChart="line"
            title="Nombre de messages au cours du temps"
          />
        </Grid>
      </Grid>
    </div>
  </Slide>
);

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 4
  }
});

export default withStyles(styles)(Homepage);
