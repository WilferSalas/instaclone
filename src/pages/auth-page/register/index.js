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
import { REGISTER } from '../../../gql/user';

// @styles
import styles from '../styles';

const RegisterPage = ({ classes, isLogin }) => {
  const [ register ] = useMutation(REGISTER);

  const handleOnSubmit = async (formData) => {
    try {
      const newUser = formData;
      delete newUser.repeatPassword;

      await register({
        variables: {
          input: newUser
        }
      });

      toast.success('Usuario registrado correctamente');
      isLogin(true);
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
            ¿Ya tienes una cuenta?
            <Link
            className={classes.link}
            href="#"
            onClick={() => isLogin(true)}
          >
            Inicia sesion
          </Link>
        </Typography>
      </Paper>
    </React.Fragment>
  )
}

RegisterPage.propTypes = {
  classes : PropTypes.object.isRequired,
  isLogin: PropTypes.func.isRequired
}

export default withStyles(styles)(RegisterPage);
