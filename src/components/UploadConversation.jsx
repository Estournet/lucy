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
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Parser from '../utils/Parser';

class UploadConversation extends React.PureComponent {
  handleUploadChange = e => {
    e.preventDefault();
    // this.setState({
    //   imagePreviewUrl: null,
    //   wrongFileType: false,
    //   fileTooBig: false,
    // });

    const reader = new FileReader();
    const roadmapFile = e.target.files[0];
    if (roadmapFile) {
      // if (!allowedTypes.includes(roadmapFile.type)) {
      //   this.setState({
      //     wrongFileType: true
      //   });
      // } else if (roadmapFile.size > maxFileSize) {
      //   this.setState({
      //     fileTooBig: true
      //   });
      // } else {
      reader.onloadend = () => {
        this.setState({
          roadmapFile
          // imagePreviewUrl: reader.result
        });
        // alert(reader.result)
        Parser.parseJSON(JSON.parse(reader.result));
      };
      reader.readAsText(roadmapFile);
    }
    // }
  };

  render() {
    const { classes } = this.props;
    return (
      <label htmlFor="fileInput">
        <input
          accept="application/json"
          className={classes.input}
          id="fileInput"
          multiple
          type="file"
          onChange={this.handleUploadChange}
        />
        <Button variant="contained" color="primary" fullWidth component="span">
          Choisir un fichier
        </Button>
        <Typography
          variant="overline"
          color="textSecondary"
          align="center"
          className={classes.marginTop}
        >
          4Mo max, JPG, PNG, BMP et GIF uniquement
        </Typography>
      </label>
    );
  }
}

const styles = theme => ({
  input: {
    display: 'none'
  },
  marginTop: {
    marginTop: theme.spacing.unit
  }
});

export default withStyles(styles)(UploadConversation);
