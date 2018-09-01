import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

class InlinedText extends React.PureComponent {
  render() {
    const { leftText, rightText, align, classes } = this.props;
    return (
      <div className={classes.flexContainer}>
        <Typography
          align={align}
          variant="body2"
          className={classes.paddingRight}
        >
          {`${leftText} :`}
        </Typography>
        <Typography align={align} variant="body1">
          {rightText}
        </Typography>
      </div>
    );
  }
}

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  paddingRight: {
    paddingRight: theme.spacing.unit
  }
});

InlinedText.defaultProps = {
  rightText: '',
  align: 'left'
};

InlinedText.propTypes = {
  leftText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  rightText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  align: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InlinedText);
