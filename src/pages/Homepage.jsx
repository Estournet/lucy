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

import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Grow from "@material-ui/core/Grow/Grow";
import conversations from "../conversations";
import UploadConversation from "../components/UploadConversation.jsx";
import EncryptedConversationCard from "../components/EncryptedConversationCard.jsx";
import ConversationCard from "../components/ConversationCard.jsx";
import LoginBackground from "../assets/background.png";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

const Homepage = props => (
  <Grow in direction="up" mountOnEnter unmountOnExit>
    <div className={props.classes.background}>
      <div className={props.classes.content}>
        <div className={props.classes.title}>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>
            Lucy
          </Typography>
          <Typography variant="h4" align="center" color="textPrimary">
            Messenger statistics
          </Typography>
        </div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <UploadConversation />
          </Grid>
          {Object.keys(conversations)
            .sort()
            .map(
              conversationID =>
                conversations[conversationID].encrypted ? (
                  <EncryptedConversationCard
                    key={conversationID}
                    conversationID={conversationID}
                    displayName={conversations[conversationID].displayName}
                    subtitle={conversations[conversationID].subtitle}
                    fileName={conversations[conversationID].fileName}
                  />
                ) : (
                  <ConversationCard
                    key={conversationID}
                    conversationID={conversationID}
                    displayName={conversations[conversationID].displayName}
                    subtitle={conversations[conversationID].subtitle}
                  />
                )
            )}
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </div>
  </Grow>
);

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  background: {
    backgroundImage: `url('${LoginBackground}')`,
    backgroundSize: "cover",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center"
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.85); ",
    borderRadius: 5,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  }
});

Homepage.propTypes = {
  classes: PropTypes.object.isRequired
};

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(Homepage);
