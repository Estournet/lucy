import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Slide from '@material-ui/core/Slide/Slide';
import conversations from '../conversations';
import UploadConversation from '../components/UploadConversation.jsx';
import EncryptedConversationCard from '../components/EncryptedConversationCard.jsx';
import ConversationCard from '../components/ConversationCard.jsx';

const Homepage = props => (
  <Slide in direction="up" mountOnEnter unmountOnExit>
    <div className={props.classes.content}>
      <div className={props.classes.title}>
        <Typography
          variant="display2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Lucy
        </Typography>
        <Typography variant="headline" align="center" color="textPrimary">
          Messenger statistics
        </Typography>
      </div>
      <UploadConversation />
      <Grid container spacing={16}>
        {Object.keys(conversations)
          .sort()
          .map(
            conversationID =>
              conversations[conversationID].encrypted ? (
                <EncryptedConversationCard
                  key={conversationID}
                  conversationID={conversationID}
                  displayName={conversations[conversationID].displayName}
                />
              ) : (
                <ConversationCard
                  key={conversationID}
                  conversationID={conversationID}
                  displayName={conversations[conversationID].displayName}
                />
              )
          )}
      </Grid>
    </div>
  </Slide>
);

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minHeight: '100vh'
  }
});

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(Homepage);
