import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import ParsedData from '../utils/Parser';
import { formatNumber } from '../utils/Formats';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

class Stats extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="title" align="left" gutterBottom>
          Statistiques
        </Typography>

        <Typography variant="subheading" align="left">
          Nombre total de messages : {formatNumber(ParsedData.totalMessages)}
        </Typography>
        <Typography variant="subheading" align="left">
          Nombre total de caractères : {formatNumber(ParsedData.totalChars)}
        </Typography>
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  })
});

export default withStyles(styles)(Stats);
