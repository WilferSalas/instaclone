// @packages
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { withStyles } from '@material-ui/core/styles';

// @images
import logo from '../../../styles/assets/instaclone.png';

// @styles
import styles from '../styles';

const Form = ({ classes, onSubmit }) => {
  const {
    errors,
    handleSubmit,
    register,
    watch
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <React.Fragment>
      <img className={classes.logo} src={logo} alt="logo" />
      <Typography>
        Registrate para ver las fotos y videos de tus amigos.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
        <TextField
          autoFocus
          className={classes.input}
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name && 'El nombre es obligatorio'}
          id="register-page-name"
          inputRef={register({ required: true })}
          label=""
          name="name"
          placeholder="Nombre y apellidos"
          size="small"
          variant="outlined"
        />
        <TextField
          className={classes.input}
          error={Boolean(errors.userName)}
          fullWidth
          helperText={errors.userName && 'El nombre de usuario es obligatorio'}
          id="register-page-user-name"
          inputRef={register({ required: true })}
          label=""
          name="userName"
          placeholder="Nombre de usuario"
          size="small"
          variant="outlined"
        />
        <TextField
          className={classes.input}
          error={Boolean(errors.email)}
          fullWidth
          helperText={errors.email && errors.email.message}
          id="regisyer-page-user-email"
          inputRef={register({
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'El correo debe ser valido'
            }
          })}
          label=""
          name="email"
          placeholder="Correo electronico"
          size="small"
          variant="outlined"
        />
        <TextField
          className={classes.input}
          error={Boolean(errors.password)}
          fullWidth
          helperText={errors.password && errors.password.message}
          id="login-page-user-password"
          inputRef={register({
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 8,
              message: "La contraseña debe tener minimo 8 caracteres"
            }
          })}
          label=""
          name="password"
          placeholder="Contraseña"
          size="small"
          type="password"
          variant="outlined"
        />
        <TextField
          className={classes.input}
          error={Boolean(errors.repeatPassword)}
          fullWidth
          helperText={errors.repeatPassword && errors.repeatPassword.message}
          id="login-page-user-repeat-password"
          inputRef={register({
            validate: value =>
              value === password.current || "Las contraseña no coinciden"
          })}
          label=""
          name="repeatPassword"
          placeholder="Repetir contraseña"
          size="small"
          type="password"
          variant="outlined"
        />
        <Button
          className={classes.button}
          color="primary"
          fullWidth
          size="small"
          type="submit"
          variant="contained"
        >
          Registrarse
        </Button>
      </form>
    </React.Fragment>
  )
}

Form.propTypes = {
  classes : PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(Form);
