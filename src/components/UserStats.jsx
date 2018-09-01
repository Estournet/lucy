import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { formatNumber } from '../utils/Formats';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import InlinedText from './InlinedText';

const UserStats = props => {
  return (
    <Paper className={props.classes.paper}>
      <Typography variant="title" align="left" gutterBottom>
        Statistiques
      </Typography>

      <InlinedText
        leftText="Nombre total de messages"
        rightText={formatNumber(props.user.totalMessages)}
      />
      <InlinedText
        leftText="Nombre total de caractères"
        rightText={formatNumber(props.user.totalChars)}
      />
    </Paper>
  );
};

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  })
});

// UserStats.defaultProps = {
// };

UserStats.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(UserStats);
