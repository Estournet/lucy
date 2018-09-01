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

  getFormattedData = data => ({
    labels: data.keys,
    datasets: [
      {
        label: this.props.label,
        backgroundColor: this.props.theme.palette.secondary.main,
        // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        // hoverBorderColor: 'rgba(255,99,132,1)',
        fill: false,
        data: data.values
      }
    ]
  });

  handleChartTypeChange = event =>
    this.setState({ chartType: event.target.value });

  getChart = () => {
    switch (this.state.chartType) {
      case 'bar':
        return <Bar data={this.getFormattedData(this.props.data)} />;
      case 'horizontalBar':
        return <HorizontalBar data={this.getFormattedData(this.props.data)} />;
      case 'line':
        return <Line data={this.getFormattedData(this.props.data)} />;
      case 'donut':
        return <Doughnut data={this.getFormattedData(this.props.data)} />;
      case 'polar':
        return <Polar data={this.getFormattedData(this.props.data)} />;
      case 'radar':
        return <Radar data={this.getFormattedData(this.props.data)} />;
      default:
        return 'default';
    }
  };

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="title" gutterBottom>
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
