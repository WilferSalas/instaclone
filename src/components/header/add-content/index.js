// @packages
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import LoadingPage from '../../loading-page';
import { PUBLISH } from '../../../gql/publications';

// @styles
import styles from './styles';

const AddContent = ({ classes, id, onClose }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ publish ] = useMutation(PUBLISH);

  const handleOnUploadPhoto = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({ type: 'image', file, preview: URL.createObjectURL(file) });
  }, []);

  const handleOnPublish = async () => {
    try {
      setLoading(true);

      const { data } = await publish({
        variables: {
          file: fileUpload.file
        }
      });

      if (data.publish.status) {
        toast.success('Se publicó correctamente');
        setLoading(false);
      }
      else toast.error('Error al intentar publicar el contenido, intenta de nuevo')

      onClose();
    } catch (error) {
      toast.error('Error al intentar publicar el contenido, intenta de nuevo');
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: false,
    noKeyboard: true,
    onDrop: handleOnUploadPhoto
  });

  return (
    <Box className={classes.addContent} id={id} {...getRootProps()}>
      {fileUpload?.type &&
        <Box>
          <div
            className={classes.previewImage}
            style={{ backgroundImage: `url("${fileUpload.preview}")` }}
          />
          <Button
            className={classes.button}
            color="primary"
            fullWidth
            onClick={handleOnPublish}
            variant="contained"
          >
            Publicar
          </Button>
          {loading &&
            <Box className={classes.loading}>
              <LoadingPage
                fullPage={false}
                id="upload-photo"
                size={40}
              />
            </Box>
          }
        </Box>
      }
      {!fileUpload &&
        <Box className={classes.content}>
          <CloudUploadIcon className={classes.icon} />
          <Typography align="center" display="block">
            Arrastra la foto que deseas publicar
          </Typography>
          <input {...getInputProps()} />
        </Box>
      }
    </Box>
  )
}

AddContent.propTypes = {
  classes : PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(AddContent);
