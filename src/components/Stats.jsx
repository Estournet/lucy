import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { formatNumber } from '../utils/Formats';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Parser from '../utils/Parser';

const Stats = props => {
  const conversationData = Parser.getConversationData(props.conversationID);
  return (
    <Paper className={props.classes.paper}>
      <Typography variant="title" align="left" gutterBottom>
        Statistiques
      </Typography>

      <Typography variant="subheading" align="left">
        Nombre total de messages :{' '}
        {formatNumber(conversationData.totalMessages)}
      </Typography>
      <Typography variant="subheading" align="left">
        Nombre total de caractères : {formatNumber(conversationData.totalChars)}
      </Typography>
    </Paper>
  );
};

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  })
});

export default withStyles(styles)(Stats);
