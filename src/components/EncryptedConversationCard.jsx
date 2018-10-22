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
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

class EncryptedConversationCard extends React.PureComponent {
  state = {
    showPasswordField: false,
    passwordInput: "",
    wrongPassword: false,
    isDecrypting: false
  };

  /**
   * Uses AES 256 CBC to decrypt
   */
  decrypt = event => {
    event.preventDefault();
    const jsonFile = require(`../input/${this.props.fileName}`);
    this.setState({ isDecrypting: true });
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
              const conversationData = Parser.parsePlainText(plainText);
              this.setState({
                wrongPassword: false,
                redirect: true,
                conversationData,
                conversationName: conversationData.conversationName,
                isDecrypting: false
              });
            }
          } catch (e) {
            this.setState({ wrongPassword: true, isDecrypting: false });
          }
        });
      });
  };

  showPasswordField = () => this.setState({ showPasswordField: true });
  hidePasswordField = () => this.setState({ showPasswordField: false });
  handlePasswordInputChange = event =>
    this.setState({ passwordInput: event.target.value });

  render() {
    const {
      redirect,
      showPasswordField,
      passwordInput,
      wrongPassword,
      conversationData,
      isDecrypting
    } = this.state;
    const { classes, conversationID, displayName, subtitle } = this.props;

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
        <Grid item xs={12} sm={6} lg={3} xl={2} key={conversationID}>
          <Paper className={classes.paper} onClick={this.showPasswordField}>
            <div className={classes.flexContainer}>
              <LockIcon size="small" className={classes.iconRight} />
              <div className={classes.flex}>
                <Typography variant="subtitle1">
                  {convertUnicode(displayName)}
                </Typography>
                <Typography variant="subtitle2">
                  {convertUnicode(subtitle)}
                </Typography>
              </div>
              <IconButton size="small" className={classes.iconLeft}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </Paper>
        </Grid>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          scroll="body"
          open={showPasswordField}
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
                value={passwordInput}
                onChange={this.handlePasswordInputChange}
                error={wrongPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.hidePasswordField}
                color="primary"
                size="small">
                Annuler
              </Button>
              <Button
                onClick={this.decrypt}
                variant="contained"
                color="primary"
                size="small"
                disabled={passwordInput.length < 1}>
                Déchiffrer
                {isDecrypting ? (
                  <CircularProgress
                    className={classes.iconLeft}
                    color="inherit"
                    size={24}
                  />
                ) : (
                  <LockOpenIcon className={classes.iconLeft} />
                )}
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
  fileName: PropTypes.string.isRequired
};

export default withStyles(styles)(EncryptedConversationCard);
