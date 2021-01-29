// @packages
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import Form from './Form';
import useAuth from '../../../hooks/useAuth';
import { LOGIN } from '../../../gql/user';
import { decodeToken, setToken } from '../../../utils/token';

// @styles
import styles from '../styles';

const LoginPage = ({ classes, isLogin }) => {
  const [ login ] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const handleOnSubmit = async (formData) => {
    try {
      const { data: { login: { token } } } = await login({
        variables: {
          input: formData
        }
      });

      setToken(token);
      setUser(decodeToken(token));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={0}>
        <Form onSubmit={handleOnSubmit} />
      </Paper>
      <Paper className={classes.paper} elevation={0}>
        <Typography align="center" variant="body2">
            ¿No tienes una cuenta?
            <Link
            className={classes.link}
            href="#"
            onClick={() => isLogin(false)}
          >
            Registrate
          </Link>
        </Typography>
      </Paper>
    </React.Fragment>
  )
}

LoginPage.propTypes = {
  classes : PropTypes.object.isRequired,
  isLogin: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginPage);
