import React from 'react';
import { Divider, Typography, withStyles } from '@material-ui/core';

class Footer extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Divider className={classes.divider} />
        <Typography color="textSecondary" align="center">
          Tous droits réservés
        </Typography>
      </footer>
    );
  }
}

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    padding: '20px 10%', // Top & Bottom : 20px, Left & Right : 10%
    color: 'blue'
  },
  divider: {
    margin: theme.spacing.unit
  },
  link: {
    color: theme.palette.secondary.dark,
    textDecoration: 'none'
  }
});

export default withStyles(styles)(Footer);
