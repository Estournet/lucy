import React from 'react';
import { Typography } from '@material-ui/core';
import Stats from '../components/Stats';
import ParsedData from '../utils/Parser';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Chart from '../components/Chart';

const Homepage = props => (
  <React.Fragment>
    <Typography
      variant="display1"
      align="center"
      color="primary"
      className={props.classes.title}
    >
      {ParsedData.title}
    </Typography>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <Stats />
      </Grid>
      <Grid item xs={12}>
        <Chart data={ParsedData.messageCountPerUser} />
      </Grid>
      <Grid item xs={12}>
        <Chart data={ParsedData.charCountPerUser} />
      </Grid>
    </Grid>
  </React.Fragment>
);

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 4
  }
});

export default withStyles(styles)(Homepage);
