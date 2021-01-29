// @packages
import Box from '@material-ui/core/Box';
import ErrorIcon from '@material-ui/icons/Error';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const UserNotFound = ({ classes, id }) => {
  return (
    <Box className={classes.notFound} id={id}>
      <ErrorIcon className={classes.icon} />
      <Typography gutterBottom variant="h5">
        Usuario no encontrado
      </Typography>
      <Typography gutterBottom>
        Es posible que el enlace que has seguido sea
        incorrecto o que el usuario haya sido eliminado
      </Typography>
      <Typography>
        <Link href="/">
         Regresar a la pagina de inicio
        </Link>
      </Typography>
    </Box>
  )
}

UserNotFound.propTypes = {
  classes : PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default withStyles(styles)(UserNotFound);
