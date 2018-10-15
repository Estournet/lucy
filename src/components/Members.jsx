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
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import withStyle from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";

const Members = props => (
  <Grid container spacing={16}>
    <Grid item xs={12}>
      <Typography variant="h5">
        Membres de la conversation ({props.usersName.length})
      </Typography>
    </Grid>
    {props.usersName.sort().map(userName => (
      <Grid item xs={6} sm={4} md={3} lg={2} xl={1} key={userName}>
        <Paper className={props.classes.paper}>
          <div className={props.classes.flexContainer}>
            <div className={props.classes.flex}>
              <Typography variant="subtitle2">{userName}</Typography>
            </div>
            <div>
              <IconButton
                className={props.classes.icon}
                size="small"
                component={Link}
                to={encodeURI(`/${props.conversationID}/${userName}`)}>
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
    display: "flex",
    flexWrap: "nowrap",
    flexGrow: 1,
    alignItems: "center"
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
