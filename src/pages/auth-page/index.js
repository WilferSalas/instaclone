// @packages
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import Login from './login';
import Register from './register';

// @styles
import styles from './styles';

const AuthPage = ({ classes }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleOnSetAuth = (value) => {
    setIsLogin(value)
  };

  return (
    <Container id="register-page">
      <Box className={classes.box}>
        {isLogin
          ? <Login isLogin={handleOnSetAuth} />
          : <Register isLogin={handleOnSetAuth} />}
      </Box>
    </Container>
  )
}

AuthPage.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(AuthPage);
