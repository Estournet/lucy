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
