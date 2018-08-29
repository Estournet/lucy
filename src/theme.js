import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';

/**
 * Thème personnel
 * @type {Theme}
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700]
    },
    secondary: {
      main: pink[600]
    },
    type: 'light'
  }
});

export default theme;
