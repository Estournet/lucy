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
import { formatNumber } from "../utils/Formats";
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import InlinedText from "./InlinedText";

const UserStats = props => {
  return (
    <Paper className={props.classes.paper}>
      <Typography variant="h6" align="left" gutterBottom>
        Statistiques
      </Typography>
      <InlinedText
        leftText="Nombre total de messages"
        rightText={formatNumber(props.totalMessages)}
      />
      <InlinedText
        leftText="Nombre total de caractères"
        rightText={formatNumber(props.totalChars)}
      />
      {/*<InlinedText*/}
      {/*leftText="Date du premier message"*/}
      {/*rightText={props.firstMessageDate}*/}
      {/*/>*/}
      {/*<InlinedText*/}
      {/*leftText="Date du dernier message"*/}
      {/*rightText={props.lastMessageDate}*/}
      {/*/>*/}
    </Paper>
  );
};

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  })
});

UserStats.propTypes = {
  classes: PropTypes.object.isRequired,
  totalMessages: PropTypes.number.isRequired,
  totalChars: PropTypes.number.isRequired
  // firstMessageDate: PropTypes.string.isRequired,
  // lastMessageDate: PropTypes.string.isRequired,
  // conversationDuration: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserStats);
