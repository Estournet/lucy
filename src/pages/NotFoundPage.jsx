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

export default withStyles(styles)(NotFoundPage);
