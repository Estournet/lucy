import React from 'react';
import { Typography } from '@material-ui/core';
import Stats from '../components/Stats';
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

class ConversationPage extends React.PureComponent {
  constructor(props) {
    super();
    Parser.parse(props.match.params.conversationID);
  }

  render() {
    const { props } = this;
    const conversationData = Parser.getConversationData(
      props.match.params.conversationID
    );
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
                      <Typography
                        variant="headline"
                        align="left"
                        color="textPrimary"
                      >
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
              <Stats conversationID={conversationData.conversationID} />
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

export default withStyles(styles)(withRouter(ConversationPage));
