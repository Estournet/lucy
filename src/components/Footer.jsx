import React from 'react';
import { Divider, Typography, withStyles } from '@material-ui/core';

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
          Site sous license
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.fr.html"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.link}
          >
            GNU GPL v3
          </a>
          .
        </Typography>
        <Typography variant="caption" color="textSecondary" align="center">
          <a
            href="https://github.com/Estournet/lucy"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.link}
          >
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
