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
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { convertUnicode } from '../utils/Formats';
import PropTypes from 'prop-types';
import encryptedFile from '../input/hello.enc';
import CryptoJS from 'crypto-js';
import LockIcon from '@material-ui/icons/LockOutlined';

/**
 * Uses AES 256 CBC to decrypt
 */
const decrypt = () => {
  fetch(encryptedFile)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.readAsBinaryString(blob);
      reader.addEventListener('loadend', () => {
        const password = 'hello';
        const encryptedText = reader.result;
        const decrytedText = CryptoJS.AES.decrypt(encryptedText, password, {
          mode: CryptoJS.mode.CBC
        });
        const plaintext = decrytedText.toString(CryptoJS.enc.Utf8);
        console.log(plaintext);
      });
    });
};

/**
 * Uses AES 256 CBC to encrypt
 */
const encrypt = () => {
  console.log('Start encryption');
  const textToEncrypt = '{"field1": "hello","field2": "world"}';
  // const textToEncrypt = JSON.stringify(file);
  const password = 'myVerySecurePassword';
  const encryptedText = CryptoJS.AES.encrypt(textToEncrypt, password, {
    mode: CryptoJS.mode.CBC
  });
  console.log('Encrypted text');
  console.log(encryptedText.toString());
  console.log('End encryption');
};

const EncryptedConversationCard = props => (
  <Grid item xs={12} sm={6} lg={3} xl={2} key={props.conversationID}>
    <Paper className={props.classes.paper} onClick={() => decrypt()}>
      <div className={props.classes.flexContainer}>
        <LockIcon size="small" className={props.classes.iconRight} />
        <div className={props.classes.flex}>
          <Typography variant="body2">
            {convertUnicode(props.displayName)}
          </Typography>
        </div>
        <IconButton size="small" className={props.classes.iconLeft}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Paper>
  </Grid>
);

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexGrow: 1,
    alignItems: 'center'
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
    textDecoration: 'none'
  }
});

EncryptedConversationCard.propTypes = {
  conversationID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired
};

export default withStyles(styles)(EncryptedConversationCard);
