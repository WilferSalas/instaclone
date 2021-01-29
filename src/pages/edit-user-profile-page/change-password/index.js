// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import useAuth from '../../../hooks/useAuth';
import { UPDATE_USER } from '../../../gql/user';

// @styles
import styles from './styles';

const ChangePassword = ({ classes }) => {
  const history = useHistory();
  const [ updateUser ] = useMutation(UPDATE_USER);
  const { auth: { userName } } = useAuth();
  const {
    errors,
    handleSubmit,
    register,
    watch
  } = useForm();

  const password = useRef({});
  password.current = watch('newPassword', '');

  const handleOnSumbit = async (formData) => {
    const updateUserPassword = formData;
    delete updateUserPassword.repeatPassword;

    try {
      const { data } = await updateUser({
        variables: {
          input: updateUserPassword
        }
      });

      if (!data.updateUser) {
        toast.error('Error al cambiar contraseña');
      } else {
        toast.success('Contraseña cambiada correctamente');
        history.push(`/${userName}`);
      }
    } catch (error) {
      toast.error('Error al cambiar contraseña');
    }
  };

  return (
    <form
      autoComplete="false"
      className={classes.changePassword}
      onSubmit={handleSubmit(handleOnSumbit)}
    >
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={3}>
          <Typography align="right">
            Contraseña actual
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            autoFocus
            className={classes.input}
            error={Boolean(errors.currentPassword)}
            fullWidth
            helperText={errors.currentPassword && errors.currentPassword.message}
            id="edit-page-user-currentPassword"
            inputRef={register({
              required: 'La contraseña es obligatoria'
            })}
            label=""
            name="currentPassword"
            size="small"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            Nueva contraseña
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            error={Boolean(errors.newPassword)}
            fullWidth
            helperText={errors.newPassword && errors.newPassword.message}
            id="edit-page-user-password"
            inputRef={register({
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: "La contraseña debe tener minimo 8 caracteres"
              }
            })}
            label=""
            name="newPassword"
            size="small"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            Confirmar nueva contraseña
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            error={Boolean(errors.repeatPassword)}
            fullWidth
            helperText={errors.repeatPassword && errors.repeatPassword.message}
            id="edit-page-user-repeat-password"
            inputRef={register({
              validate: value =>
                value === password.current || "Las contraseña no coinciden"
            })}
            label=""
            name="repeatPassword"
            size="small"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <Button
            className={classes.button}
            color="primary"
            size="small"
            type="submit"
            variant="contained"
          >
            Cambiar contraseña
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

ChangePassword.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(ChangePassword);
