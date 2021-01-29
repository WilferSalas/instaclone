// @packages
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import ModalDialog from '../../../components/modal-dialog';
import useAuth from '../../../hooks/useAuth';
import { FOLLOW, UNFOLLOW, IS_FOLLOW } from '../../../gql/follow';

// @styles
import styles from './styles';

const UserProfileOptions = ({
  auth,
  classes,
  followersRefetch,
  followingRefetch,
  userName
}) => {
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [open, setOpen] = useState(false);
  const client = useApolloClient();
  const history = useHistory();
  const { logout } = useAuth();

  const [ follow ] = useMutation(FOLLOW, {
    update(cache) {
      cache.readQuery({
        query: IS_FOLLOW,
        variables: { userName }
      });

      cache.writeQuery({
        query: IS_FOLLOW,
        variables: { userName },
        data: { isFollow: true }
      })
    }
  });

  const [ unFollow ] = useMutation(UNFOLLOW, {
    update(cache) {
      cache.readQuery({
        query: IS_FOLLOW,
        variables: { userName }
      });

      cache.writeQuery({
        query: IS_FOLLOW,
        variables: { userName },
        data: { isFollow: false }
      })
    }
  });

  const { data, loading } = useQuery(IS_FOLLOW, {
    variables: { userName }
  });

  if (loading) return null;

  const handleOnClickEditProfile = () => {
    history.push('/edit-user');
  };

  const handleOnSettings = () => {
    setIsEditProfile(true);
    handleOnModal();
  };

  const handleOnFollow = async () => {
    try {
      const { data } = await follow({
        variables: { userName }
      });

      if (data) {
        toast.success(`Ahora sigues a ${userName}`);
        followersRefetch();
        followingRefetch();
      } else toast.error(`Error al intentar de seguir a ${userName}, intentalo de nuevo`);
    } catch (error) {
      toast.error(`Error al intentar de seguir a ${userName}, intentalo de nuevo`);
    }
  };

  const handleOnUnfollow = async () => {
    handleOnModal();

    try {
      const { data } = await unFollow({
        variables: { userName }
      });

      if (data) {
        toast.warning(`Has dejado de seguir a ${userName}`);
        followersRefetch();
        followingRefetch();
      } else toast.error(`Error al intentar de dejar a ${userName}, intentalo de nuevo`);

    } catch (error) {
      toast.error(`Error al intentar de dejar a ${userName}, intentalo de nuevo`);
    }
  };

  const handleOnClickUnFollow = () => {
    setIsEditProfile(false);
    handleOnModal();
  };

  const handleOnModal = () => {
    setOpen((prev) => !prev);
  };

  const handleOnLogout = () => {
    client.clearStore();
    history.push('/');
    logout();
  };

  const Option = ({ description, onClick }) => (
    <React.Fragment>
      <Typography
        align="center"
        className={classes.options}
        onClick={onClick ? onClick : Function.prototype}
      >
        {description}
      </Typography>
      <Divider />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ModalDialog
        id="user-profile-options"
        onClose={handleOnModal}
        open={open}
      >
        <Box>
          {isEditProfile &&
            <React.Fragment>
              <Option description="Editar perfil" onClick={handleOnClickEditProfile} />
              <Option description="Cerrar sesion" onClick={handleOnLogout} />
              <Option description="Cancelar" onClick={handleOnModal} />
            </React.Fragment>
          }
          {!isEditProfile &&
            <React.Fragment>
              <Typography className={classes.title} align="center" variant="h6">
                ¿Deseas dejar de seguir a {userName}?
              </Typography>
              <Divider />
              <Option description="Dejar de seguir" onClick={handleOnUnfollow} />
              <Option description="Cancelar" onClick={handleOnModal} />
            </React.Fragment>
          }
        </Box>
      </ModalDialog>
      {auth.userName === userName &&
        <IconButton
          className={classes.editProfileIcon}
          color="inherit"
          onClick={handleOnSettings}
          size="small"
          variant="outlined"
        >
          <SettingsIcon />
        </IconButton>
      }
      {(auth.userName !== userName && !data.isFollow ) &&
        <Button
          className={classes.editProfile}
          color="primary"
          onClick={handleOnFollow}
          size="small"
          variant="contained"
        >
          Seguir
        </Button>
      }
      {(auth.userName !== userName && data.isFollow ) &&
        <Button
          className={classes.editProfile}
          color="inherit"
          onClick={handleOnClickUnFollow}
          size="small"
          variant="contained"
        >
          <PersonIcon fontSize="small" />
          <CheckIcon fontSize="small" />
        </Button>
      }
    </React.Fragment>
  )
}

UserProfileOptions.propTypes = {
  auth: PropTypes.object,
  classes : PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  followersRefetch: PropTypes.func.isRequired,
  followingRefetch: PropTypes.func.isRequired,
}

UserProfileOptions.defaultProps = {
  auth: {}
}

export default withStyles(styles)(UserProfileOptions);
