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
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Parser from "../utils/Parser";
import { Redirect } from "react-router-dom";

class UploadConversation extends React.PureComponent {
  state = {
    redirect: false,
    json: undefined
  };
  handleUploadChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const uploadedFile = e.target.files[0];
    if (
      uploadedFile &&
      uploadedFile.name
        .split(".")
        .pop()
        .toLowerCase() === "json"
    ) {
      reader.onloadend = () => {
        const conversationData = Parser.parsePlainText(reader.result);
        this.setState({
          conversationData,
          conversationID: conversationData.conversationID,
          redirect: true
        });
      };
      reader.readAsText(uploadedFile);
    }
  };

  render() {
    const { classes } = this.props;
    const { redirect, conversationData, conversationID } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: encodeURI(`/${conversationID}`),
            conversationData
          }}
        />
      );
    }

    return (
      <>
        <label htmlFor="fileInput">
          <input
            accept="application/json"
            className={classes.input}
            id="fileInput"
            multiple
            type="file"
            onChange={this.handleUploadChange}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            component="span">
            Uploader un fichier
          </Button>
        </label>
        <Typography
          variant="overline"
          color="textSecondary"
          align="center"
          className={classes.marginTop}>
          Fichier de conversation Messenger (format JSON).
        </Typography>
      </>
    );
  }
}

const styles = theme => ({
  input: {
    display: "none"
  },
  marginTop: {
    marginTop: theme.spacing.unit
  }
});

export default withStyles(styles)(UploadConversation);
