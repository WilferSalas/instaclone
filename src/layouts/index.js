// @packages
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import Header from '../components/header';

// @styles
import styles from './styles';

const Layout = ({ classes, children }) => {
  return (
    <Box classes={classes.layout}>
      <Header id="layouts-component" />
      {children}
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(Layout);
