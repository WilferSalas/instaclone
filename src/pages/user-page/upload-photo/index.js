// @packages
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import LoadingPage from '../../../components/loading-page';
import useAuth from '../../../hooks/useAuth';
import { DELETE_AVATAR, GET_USER, UPDATE_AVATAR } from '../../../gql/user';

// @styles
import styles from './styles';

const UploadPhoto = ({ classes, onCancel, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { auth: { userName } } = useAuth();

  const [ updateAvatar ] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { userName }
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { userName },
        data: { getUser: { ...getUser, avatar: updateAvatar.url } }
      });
    }
  });

  const [ deleteAvatar ] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { userName }
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { userName },
        data: { getUser: { ...getUser, avatar: '' } }
      });
    }
  });

  const handleOnUploadPhoto = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    try {
      setLoading(true);

      const { data } = await updateAvatar({
        variables: { file }
      });


      if (data.updateAvatar.status) {
        setLoading(false);
      }
    } catch (error) {
      toast.error('Error al cargar la imagen, intenta de nuevo');
    };

    onClose();
  }, []);

  const handleOnDelete = async () => {
    try {
      await deleteAvatar();
      onClose();
    } catch (error) {
      toast.error('Error al eliminar la foto de perfil, intentalo de nuevo')
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: false,
    noKeyboard: true,
    onDrop: handleOnUploadPhoto
  });

  return (
    <Box className={classes.upload}>
      <Typography align="center" className={classes.title}>
        Cambiar foto de perfil
      </Typography>
      <Divider />
      {loading &&
        <Box className={classes.loading}>
          <LoadingPage
            fullPage={false}
            id="upload-photo"
            size={20}
          />
        </Box>
      }
      {!loading &&
        <Typography
          align="center"
          className={`${classes.options} ${classes.uploadPhotoOption}`}
          {...getRootProps()}
        >
          Subir foto
        </Typography>
      }
      <Divider />
      <Typography
        align="center"
        className={`${classes.options} ${classes.deletePhotoOption}`}
        onClick={handleOnDelete}
      >
        Eliminar foto de perfil actual
      </Typography>
      <Divider />
      <Typography align="center" className={classes.options} onClick={onCancel}>
        Cancelar
      </Typography>
      <Divider />
      <input {...getInputProps()} />
    </Box>
  )
}

UploadPhoto.propTypes = {
  classes: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(UploadPhoto);
