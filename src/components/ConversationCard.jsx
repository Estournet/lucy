import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { convertUnicode } from '../utils/Formats';
import PropTypes from 'prop-types';

const ConversationCard = props => (
  <Grid item xs={12} sm={6} lg={3} xl={2} key={props.conversationID}>
    <Paper className={props.classes.paper}>
      <div className={props.classes.flexContainer}>
        <div className={props.classes.flex}>
          <Typography
            variant="body2"
            component={Link}
            to={encodeURI(`/${props.conversationID}`)}
            className={props.classes.textDecorationNone}
          >
            {convertUnicode(props.displayName)}
          </Typography>
        </div>
        <IconButton
          className={props.classes.icon}
          size="small"
          component={Link}
          to={encodeURI(`/${props.conversationID}`)}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Paper>
  </Grid>
);

const styles = theme => ({
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
  textDecorationNone: {
    textDecoration: 'none'
  }
});

ConversationCard.propTypes = {
  conversationID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired
};

export default withStyles(styles)(ConversationCard);
