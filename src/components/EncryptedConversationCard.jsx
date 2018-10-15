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
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { convertUnicode } from "../utils/Formats";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import LockIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Parser from "../utils/Parser";
import { Redirect } from "react-router-dom";

class EncryptedConversationCard extends React.PureComponent {
  state = {
    showPasswordField: false,
    passwordInput: "",
    wrongPassword: false
  };

  /**
   * Uses AES 256 CBC to decrypt
   */
  decrypt = event => {
    event.preventDefault();
    const jsonFile = require(`../input/${this.props.filePath}`);
    fetch(jsonFile)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsBinaryString(blob);
        reader.addEventListener("loadend", () => {
          const password = this.state.passwordInput;
          const encryptedText = reader.result;
          const decrytedText = CryptoJS.AES.decrypt(encryptedText, password, {
            mode: CryptoJS.mode.CBC
          });
          try {
            const plainText = decrytedText.toString(CryptoJS.enc.Utf8);
            if (!plainText) {
              this.setState({ wrongPassword: true });
            } else {
              this.setState({
                wrongPassword: false,
                redirect: true,
                json: Parser.parsePlainText(plainText)
              });
            }
          } catch (e) {
            this.setState({ wrongPassword: true });
          }
        });
      });
  };

  /**
   * Uses AES 256 CBC to encrypt
   */
  encrypt = () => {
    console.log("Start encryption");
    const textToEncrypt = '{"field1": "hello","field2": "world"}';
    // const textToEncrypt = JSON.stringify(test);
    const password = "myVerySecurePassword";
    const encryptedText = CryptoJS.AES.encrypt(textToEncrypt, password, {
      mode: CryptoJS.mode.CBC
    });
    console.log("Encrypted text");
    console.log(encryptedText.toString());
    console.log("End encryption");
  };

  showPasswordField = () => this.setState({ showPasswordField: true });
  hidePasswordField = () => this.setState({ showPasswordField: false });
  handlePasswordInputChange = event =>
    this.setState({ passwordInput: event.target.value });

  render() {
    const { state, props } = this;
    if (state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/scarlettjohansson", // We use this URL because \o/
            conversationData: this.state.json,
            allowed: true
          }}
        />
      );
    }
    return (
      <>
        <Grid item xs={12} sm={6} lg={3} xl={2} key={props.conversationID}>
          <Paper
            className={props.classes.paper}
            onClick={this.showPasswordField}>
            <div className={props.classes.flexContainer}>
              <LockIcon size="small" className={props.classes.iconRight} />
              <div className={props.classes.flex}>
                <Typography variant="subtitle1">
                  {convertUnicode(props.displayName)}
                </Typography>
                <Typography variant="subtitle2">
                  {convertUnicode(props.subtitle)}
                </Typography>
              </div>
              <IconButton size="small" className={props.classes.iconLeft}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </Paper>
        </Grid>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          open={state.showPasswordField}
          onClose={this.hidePasswordField}>
          <form onSubmit={this.decrypt}>
            <DialogTitle id="form-dialog-title">
              Conversation chiffrée
            </DialogTitle>
            <DialogContent>
              <DialogContentText variant="body1">
                Cette conversation est chiffrée. Pour la déchiffrer, veuillez
                entrer le mot de passe qui vous a été communiqué.
              </DialogContentText>
              <TextField
                autoFocus
                type="password"
                margin="dense"
                label="Mot de passe"
                fullWidth
                required
                value={state.passwordInput}
                onChange={this.handlePasswordInputChange}
                error={state.wrongPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.hidePasswordField} color="primary">
                Annuler
              </Button>
              <Button
                onClick={this.decrypt}
                variant="contained"
                color="primary"
                disabled={state.passwordInput.length < 1}>
                Déchiffrer
                <LockOpenIcon className={props.classes.iconLeft} />
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
}

const Transition = props => <Slide direction="up" {...props} />;

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
  iconLeft: {
    marginLeft: theme.spacing.unit
  },
  iconRight: {
    marginRight: theme.spacing.unit
  },
  textDecorationNone: {
    textDecoration: "none"
  }
});

EncryptedConversationCard.defaultProps = {
  subtitle: ""
};

EncryptedConversationCard.propTypes = {
  conversationID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  filePath: PropTypes.string.isRequired
};

export default withStyles(styles)(EncryptedConversationCard);
