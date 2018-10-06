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
import { Button, Grid, Typography, withStyles } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotFoundPage = props => (
  <Grid
    container
    spacing={40}
    justify="center"
    alignContent="center"
    alignItems="center"
    direction="column"
  >
    <Grid item xs={12}>
      <Typography variant="display1" align="center">
        Oops, page non trouvée !
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Button
        variant="raised"
        size="large"
        color="primary"
        component={Link}
        to="/"
        className={props.classes.button}
      >
        {"Retourner à l'accueil"}
      </Button>
    </Grid>
  </Grid>
);

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  }
});

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(NotFoundPage);
