import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { convertUnicode } from '../utils/Formats';
import PropTypes from 'prop-types';
import testEncrypted from '../input/test-AES-256-CBC.enc';
import CryptoJS from 'crypto-js';
import LockIcon from '@material-ui/icons/LockOutlined';

const decrypt = () => {
  alert('Start decrypting');
  const req = new XMLHttpRequest();
  req.open('GET', testEncrypted, false);
  req.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      alert('Start XML Request');
      const allText = this.responseText;
      console.log(allText);
      const password = 'test';
      const bytes = CryptoJS.AES.decrypt(allText, password);
      // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      console.log(bytes.toString());
      console.log(bin2String(bytes));
      console.log('END');
      alert('END XML Request');
      // console.log(plaintext)
    }
  };
  req.send(null);

  // const password = "NiqueTaMereAntoine";
  // const rawData = (testEncrypted);
  // Decode the base64 data so we can separate iv and crypt text.
  //     var iv = rawData.substring(0, 16);
  //     var crypttext = rawData.substring(16);
  //     console.log(crypttext);
  // Decrypt...
  //     var plaintextArray = CryptoJS.AES.decrypt(
  //       { ciphertext: CryptoJS.enc.Latin1.parse(crypttext) },
  //       CryptoJS.enc.Hex.parse(password),
  //       { iv: CryptoJS.enc.Latin1.parse(iv) }
  //     );
  //     const result = CryptoJS.enc.Latin1.stringify(plaintextArray);
  //     console.log(result);
  //     this.setState({ enc: result });

  // console.log("Decrypting...");
  // console.log("Input : " );
  // console.log(testEncrypted.toString())
  // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(test), password);
  // console.log(encrypted.toString());
  // const bytes = CryptoJS.AES.decrypt(testEncrypted, password);
  // console.log(bytes);
  // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  // this.setState({enc: plaintext})
  // console.log(plaintext);
};
const hex2a = hex => {
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

const bin2String = array => {
  var result = '';
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
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
