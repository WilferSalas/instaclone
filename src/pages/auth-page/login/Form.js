// @packages
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { withStyles } from '@material-ui/core/styles';

// @images
import logo from '../../../styles/assets/instaclone.png';

// @styles
import styles from '../styles';

const Form = ({ classes, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  const preventDefault = (event) => event.preventDefault();

  return (
    <React.Fragment>
      <img className={classes.logo} src={logo} alt="logo" />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
        <TextField
          autoFocus
          className={classes.input}
          error={Boolean(errors.email)}
          fullWidth
          helperText={errors.email && errors.email.message}
          id="login-page-user-email"
          inputRef={register({
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'El correo debe ser valido'
            }
          })}
          label=""
          name="email"
          placeholder="Correo"
          size="small"
          variant="outlined"
        />
        <TextField
          className={classes.input}
          error={Boolean(errors.password)}
          fullWidth
          helperText={errors.password && 'La contraseña es obligatoria'}
          id="login-page-user-password"
          inputRef={register({ required: true })}
          label=""
          name="password"
          placeholder="Contraseña"
          size="small"
          type="password"
          variant="outlined"
        />
        <Button
          className={classes.button}
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
        >
          Inicia sesion
        </Button>
        <Typography align="center" variant="body2">
          <Link
            className={`${classes.link} ${classes.linkForm}`}
            href="/register"
            onClick={preventDefault}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Typography>
      </form>
    </React.Fragment>
  )
}

Form.propTypes = {
  classes : PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(Form);
