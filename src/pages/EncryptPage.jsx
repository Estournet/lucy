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
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Slide from "@material-ui/core/Slide/Slide";
import CryptoJS from "crypto-js";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import LockIcon from "@material-ui/icons/LockOutlined";
import SaveIcon from "@material-ui/icons/Save";
import { CopyToClipboard } from "react-copy-to-clipboard";

class EncryptPage extends React.PureComponent {
  state = {
    textToEncrypt: "",
    encryptedText: "",
    password: ""
  };

  /**
   * Uses AES 256 CBC to encrypt
   */
  encrypt = e => {
    e.preventDefault();
    const { textToEncrypt, password } = this.state;
    const encryptedText = CryptoJS.AES.encrypt(textToEncrypt, password, {
      mode: CryptoJS.mode.CBC
    }).toString();
    this.setState({ encryptedText });
  };

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value
    });

  handleUploadChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      reader.onloadend = () => {
        this.setState({
          textToEncrypt: reader.result
        });
      };
      reader.readAsText(uploadedFile);
    }
  };

  downloadFile = () => {
    const a = window.document.createElement("a");
    const { encryptedText } = this.state;
    a.href = URL.createObjectURL(
      new Blob([encryptedText], { type: "application/octet-stream" })
    );
    a.download = "encryptedFile.enc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  render() {
    const { textToEncrypt, encryptedText, password } = this.state;
    const { classes } = this.props;

    return (
      <Slide in direction="up" mountOnEnter unmountOnExit>
        <div>
          <Grid container spacing={32}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Texte à chiffrer
              </Typography>
              <Typography variant="body2" paragraph>
                Vous pouvez chiffrer du texte en copiant votre texte dans la
                zone ci dessous ou bien en uploadant directement un fichier.
                Faites attention à utiliser un mot de passe suffisament
                sécurisé. Nous utilisons AES 256 CBC pour chiffrer votre texte.
              </Typography>
              <form onSubmit={this.encrypt}>
                <TextField
                  id="textToEncrypt"
                  required
                  multiline
                  rows={1}
                  rowsMax={10}
                  value={textToEncrypt}
                  onChange={this.handleChange("textToEncrypt")}
                  margin="normal"
                  fullWidth
                />
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
                <TextField
                  id="password"
                  required
                  label="Mot de passe"
                  onChange={this.handleChange("password")}
                  margin="normal"
                  fullWidth
                />
                <Button
                  onClick={this.encrypt}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={password.length < 1}>
                  Chiffrer
                  <LockIcon className={classes.marginRight} />
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Texte chiffré
              </Typography>
              <CopyToClipboard text={encryptedText}>
                <Button
                  disabled={encryptedText.length === 0}
                  size="small"
                  color="secondary"
                  className={classes.marginRight}>
                  <FileCopyIcon className={classes.marginRight} />
                  Copier
                </Button>
              </CopyToClipboard>
              <Button
                onClick={this.downloadFile}
                disabled={encryptedText.length === 0}
                size="small"
                color="primary">
                <SaveIcon className={classes.marginRight} />
                Télécharger
              </Button>
              <TextField
                value={encryptedText}
                multiline
                rows={12}
                rowsMax={20}
                fullWidth
                variant="filled"
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Slide>
    );
  }
}

const styles = theme => ({
  marginRight: {
    marginRight: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(EncryptPage);
