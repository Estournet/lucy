import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import withStyle from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';

const Members = props => (
  <Grid container spacing={16}>
    <Grid item xs={12}>
      <Typography variant="title">Membres de la conversation</Typography>
    </Grid>
    {props.usersName.sort().map(userName => (
      <Grid item xs={4} key={userName}>
        <Paper className={props.classes.paper}>
          <div className={props.classes.flexContainer}>
            <div className={props.classes.flex}>
              <Typography variant="body2">{userName}</Typography>
            </div>
            <div>
              <IconButton
                className={props.classes.icon}
                size="small"
                component={Link}
                to={encodeURI(`/${props.conversationID}/${userName}`)}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        </Paper>
      </Grid>
    ))}
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
  }
});

Members.defaultProps = {
  usersName: []
};

Members.propTypes = {
  conversationID: PropTypes.string.isRequired,
  usersName: PropTypes.arrayOf(PropTypes.string)
};

export default withStyle(styles)(Members);
