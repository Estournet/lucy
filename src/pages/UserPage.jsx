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
import Stats from '../components/Stats.jsx';
import Parser from '../utils/Parser';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Chart from '../components/Chart';
import Paper from '@material-ui/core/Paper/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import { Link, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide/Slide';

const UserPage = props => {
  const { conversationID, userName } = props.match.params;
  const conversationData = Parser.getConversationData(conversationID);
  const user = conversationData.users.find(
    element => element.userName === userName
  );
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <div>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Paper className={props.classes.paper}>
              <Toolbar>
                <IconButton
                  className={props.classes.menuButton}
                  component={Link}
                  to={encodeURI(`/${conversationID}`)}
                >
                  <ArrowBackIcon />
                </IconButton>
                <div className={props.classes.flexContainer}>
                  <div className={props.classes.flex}>
                    <Typography variant="h5">
                      {props.match.params.userName}
                    </Typography>
                    <Typography
                      noWrap
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {conversationData.conversationName}
                    </Typography>
                  </div>
                </div>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Stats
                  totalMessages={user.totalMessages}
                  totalChars={user.totalChars}
                />
              </Grid>
              <Grid item xs={12}>
                <Chart
                  data={user.messagesPerMonth}
                  label="Nombre de message"
                  defaultChart="line"
                  title="Nombre de messages au cours du temps"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
};

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'center'
  },
  flex: {
    flexGrow: 1
  },
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  paper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(withRouter(UserPage));
