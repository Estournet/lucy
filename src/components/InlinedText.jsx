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
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

class InlinedText extends React.PureComponent {
  render() {
    const { leftText, rightText, align, classes } = this.props;
    return (
      <div className={classes.flexContainer}>
        <Typography
          align={align}
          variant="subtitle2"
          className={classes.paddingRight}>
          {`${leftText} :`}
        </Typography>
        <Typography align={align} variant="subtitle1">
          {rightText}
        </Typography>
      </div>
    );
  }
}

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  paddingRight: {
    paddingRight: theme.spacing.unit
  }
});

InlinedText.defaultProps = {
  rightText: "",
  align: "left"
};

InlinedText.propTypes = {
  leftText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  rightText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  align: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InlinedText);
