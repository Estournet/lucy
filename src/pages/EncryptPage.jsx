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
import Slide from "@material-ui/core/Slide/Slide";

const EncryptPage = props => {
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <div>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Typography variant="h1">TODO</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1">TODO</Typography>
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
};

const styles = theme => ({});

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(EncryptPage);
