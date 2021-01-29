// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import useAuth from '../../../hooks/useAuth';
import { GET_USER } from '../../../gql/user';
import { UPDATE_USER } from '../../../gql/user';

// @styles
import styles from './styles';

const EditProfileInfo = ({ classes }) => {
  const history = useHistory();
  const [form, setForm] = useState(null);
  const { auth: { userName } } = useAuth();
  const { errors, handleSubmit, register } = useForm();
  const { data, loading } = useQuery(GET_USER, {
    variables: { userName }
  });
  const [ updateUser ] = useMutation(UPDATE_USER, {
    update(cache) {
      cache.writeQuery({
        query: GET_USER,
        variables: { userName },
        data: { getUser: form }
      })
    }
  });

  if (loading) return null;

  const handleOnSumbit = async (formData) => {
    setForm(formData);

    try {
      const { data } = await updateUser({
        variables: {
          input: formData
        }
      });

      if (!data.updateUser) {
        toast.error('Error al cambiar los datos');
      } else {
        toast.success('Datos cambiados correctamente');
        history.push(`/${userName}`);
      }
    } catch (error) {
      toast.error('Error al cambiar los datos');
    }
  };

  return (
    <form
      autoComplete="false"
      className={classes.editProfile}
      onSubmit={handleSubmit(handleOnSumbit)}
    >
      <Grid alignItems="center" container spacing={3}>
        <Grid item xs={3}>
          <Typography align="right">
            Nombre
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            autoFocus
            className={classes.input}
            defaultValue={data.getUser.name}
            error={Boolean(errors.name)}
            fullWidth
            helperText={errors.name && errors.name.message}
            id="edit-page-user-name"
            inputRef={register({
              required: 'El nombre es obligatoria'
            })}
            label=""
            name="name"
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            Nombre de usuario
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            defaultValue={data.getUser.userName}
            error={Boolean(errors.userName)}
            fullWidth
            helperText={errors.userName && errors.userName.message}
            id="edit-page-user-user-name"
            inputRef={register({
              required: 'El nombre de usuario es obligatoria'
            })}
            label=""
            name="userName"
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            Website
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            defaultValue={data.getUser.site}
            fullWidth
            id="edit-page-user-site"
            inputRef={register()}
            label=""
            name="site"
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            Bio
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            defaultValue={data.getUser.description}
            fullWidth
            id="edit-page-user-bio"
            inputRef={register()}
            label=""
            name="description"
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            Correo
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            defaultValue={data.getUser.email}
            error={Boolean(errors.email)}
            fullWidth
            helperText={errors.email && errors.email.message}
            id="edit-page-user-user-email"
            inputRef={register({
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'El correo debe ser valido'
              }
            })}
            label=""
            name="email"
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <Button
            color="primary"
            size="small"
            type="submit"
            variant="contained"
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

EditProfileInfo.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfileInfo);
