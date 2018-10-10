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
import Parser from '../utils/Parser';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Chart from '../components/Chart';
import Members from '../components/Members';
import Slide from '@material-ui/core/Slide/Slide';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Stats from '../components/Stats.jsx';

class ConversationPage extends React.PureComponent {
  state = {
    conversationData: undefined
  };

  componentDidMount() {
    const { location, match } = this.props;
    if (location.conversationData) {
      this.setState({ conversationData: location.conversationData });
    } else {
      this.setState({
        conversationData: Parser.getConversationData(
          match.params.conversationID
        )
      });
    }
  }

  render() {
    const { conversationData } = this.state;
    const { props } = this;
    if (conversationData === null) return ''; //TODO
    return (
      <Slide in direction="up" mountOnEnter unmountOnExit>
        <div>
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <Paper className={props.classes.paper}>
                <Toolbar>
                  <div className={props.classes.flexContainer}>
                    <IconButton
                      className={props.classes.menuButton}
                      component={Link}
                      to="/"
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <div className={props.classes.flex}>
                      <Typography variant="h5" align="left" color="textPrimary">
                        {conversationData.conversationName}
                      </Typography>
                    </div>
                  </div>
                </Toolbar>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Members
                usersName={conversationData.users.map(user => user.userName)}
                conversationID={conversationData.conversationID}
              />
            </Grid>
            <Grid item xs={12}>
              <Stats
                totalMessages={conversationData.totalMessages}
                totalChars={conversationData.totalChars}
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                data={conversationData.messageCountPerUser}
                label="Nombre de messages"
                defaultChart="bar"
                title="Nombre de messages total"
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                data={conversationData.charCountPerUser}
                label="Nombre de caractères"
                defaultChart="bar"
                title="Nombre de caractères total"
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                data={conversationData.messagesPerMonth}
                label="Nombre de messages"
                defaultChart="line"
                title="Nombre de messages au cours du temps"
              />
            </Grid>
          </Grid>
        </div>
      </Slide>
    );
  }
}

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing.unit
  },
  paper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'noWrap',
    flexGrow: 1,
    alignItems: 'center'
  },
  flex: {
    flexGrow: 1
  }
});

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(withRouter(ConversationPage));
