// @packages
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const NotFoundPage = ({ classes }) => {
  return (
    <Container id="home-page">
      <Typography>404</Typography>
    </Container>
  )
}

NotFoundPage.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(NotFoundPage);
