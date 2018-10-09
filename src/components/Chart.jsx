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

import React from 'react';
import {
  Bar,
  Doughnut,
  HorizontalBar,
  Line,
  Polar,
  Radar
} from 'react-chartjs-2';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Paper from '@material-ui/core/Paper/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';

class Chart extends React.PureComponent {
  state = {
    chartType: this.props.defaultChart
  };

  getColors = size => {
    const availableColors = [
      'rgb(194, 24, 91)',
      'rgb(186, 104, 200)',
      'rgb(0, 151, 167)',
      'rgb(0, 200, 83)',
      'rgb(255, 234, 0)',
      'rgb(255, 183, 77)'
    ];
    const chartColors = [];
    for (let i = 0; i < size; i++) {
      chartColors.push(availableColors[i % availableColors.length]);
    }
    console.log(this.props.data);

    return chartColors;
  };

  getFormattedDataWithRainbowColors = () => ({
    labels: this.props.data.keys,
    datasets: [
      {
        label: this.props.label,
        backgroundColor: this.getColors(this.props.data.size),
        fill: false,
        data: this.props.data.values
      }
    ]
  });

  getFormattedDataWithOneColor = () => ({
    labels: this.props.data.keys,
    datasets: [
      {
        label: this.props.label,
        backgroundColor: this.props.theme.palette.secondary.main,
        borderColor: this.props.theme.palette.secondary.main,
        pointBackgroundColor: this.props.theme.palette.secondary.main,
        pointBorderColor: this.props.theme.palette.secondary.main,
        pointBorderWidth: 3,
        fill: false,
        data: this.props.data.values
      }
    ]
  });

  handleChartTypeChange = event =>
    this.setState({ chartType: event.target.value });

  getChart = () => {
    switch (this.state.chartType) {
      case 'bar':
        return <Bar data={this.getFormattedDataWithRainbowColors} />;
      case 'horizontalBar':
        return <HorizontalBar data={this.getFormattedDataWithRainbowColors} />;
      case 'line':
        return <Line data={this.getFormattedDataWithOneColor} />;
      case 'donut':
        return <Doughnut data={this.getFormattedDataWithRainbowColors} />;
      case 'polar':
        return <Polar data={this.getFormattedDataWithRainbowColors} />;
      case 'radar':
        return <Radar data={this.getFormattedDataWithOneColor} />;
      default:
        return 'default';
    }
  };

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {this.props.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type de graphique</InputLabel>
            <Select
              value={this.state.chartType}
              onChange={this.handleChartTypeChange}
            >
              <MenuItem value="bar">Histogramme</MenuItem>
              <MenuItem value="horizontalBar">Histogramme horizontal</MenuItem>
              <MenuItem value="line">Courbe</MenuItem>
              <MenuItem value="donut">Donut</MenuItem>
              <MenuItem value="polar">Aire polaire</MenuItem>
              <MenuItem value="radar">Radar</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper className={this.props.classes.paper}>{this.getChart()}</Paper>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing.unit * 1
  }
});

Chart.defaultProps = {
  defaultChart: 'horizontalBar',
  label: '',
  title: ''
};

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  defaultChart: PropTypes.oneOf([
    'bar',
    'horizontalBar',
    'line',
    'donut',
    'polar',
    'radar'
  ]),
  label: PropTypes.string,
  title: PropTypes.string
};

export default withTheme()(withStyles(styles)(Chart));
