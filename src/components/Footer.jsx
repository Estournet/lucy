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
import { Divider, Typography, withStyles } from "@material-ui/core";

class Footer extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Divider className={classes.divider} />
        <Typography color="textSecondary" align="center">
          Créé par Vincent M.
        </Typography>
        <Typography variant="caption" color="textSecondary" align="center">
          {"Site sous license "}
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.fr.html"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.link}>
            GNU GPL v3
          </a>
          .
        </Typography>
        <Typography variant="caption" color="textSecondary" align="center">
          <a
            href="https://github.com/Estournet/lucy"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.link}>
            Voir le projet sur GitHub
          </a>
          .
        </Typography>
      </footer>
    );
  }
}

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    padding: "20px 10%", // Top & Bottom : 20px, Left & Right : 10%
    color: "blue"
  },
  divider: {
    margin: theme.spacing.unit
  },
  link: {
    color: theme.palette.secondary.dark,
    textDecoration: "none"
  }
});

export default withStyles(styles)(Footer);
