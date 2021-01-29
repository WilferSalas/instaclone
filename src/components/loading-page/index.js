// @packages
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const LoadingPage = ({
  classes,
  fullPage,
  id,
  size
}) => {
  return (
    <Box
      className={fullPage
        ? classes.loading
        : classes.loadingSmall}
      id={id}
    >
      <CircularProgress size={size} />
    </Box>
  )
}

LoadingPage.propTypes = {
  classes : PropTypes.object.isRequired,
  fullPage: PropTypes.bool,
  id: PropTypes.string.isRequired,
  size: PropTypes.number
}

LoadingPage.defaultProps = {
  fullPage: true,
  size: 40
}

export default withStyles(styles)(LoadingPage);
