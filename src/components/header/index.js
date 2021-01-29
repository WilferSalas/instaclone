// @packages
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import AddContent from './add-content';
import ModalDialog from '../modal-dialog';
import Search from './search';
import useAuth from '../../hooks/useAuth';
import { GET_USER } from '../../gql/user';

// @images
import Logo from '../../styles/assets/instaclone.png'

// @styles
import styles from './styles';

const Header = ({ classes, id }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { auth: { name, userName, id: idUser } } = useAuth();
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: idUser, userName }
  });

  if (loading) return null;

  const { getUser: { avatar } } = data;

  const getNameInitials = (str) => {
    if (!str) {
      return '';
    }

    const tokens = str.split(' ');
    let initials = tokens[0].substring(0, 1).toUpperCase();

    if (tokens.length === 2) {
      initials += tokens[1].substring(0, 1).toUpperCase();
    } else if (tokens.length >= 3) {
      initials += tokens[2].substring(0, 1).toUpperCase();
    }

    return initials;
  };

  const handleOnRedirect = () => {
    history.push(`/${userName}`)
  };

  const handleOnClickHome = () => {
    history.push('/');
  };

  const handleOnClickProfile = () => {
    history.push(`/${userName}`);
  };

  const handleOnClickAdd = () => {
    setOpen((prev) => !prev);
  };

  const preventDefault = (event) => event.preventDefault();

  return (
    <AppBar
      className={classes.appbar}
      color="inherit"
      id={id}
      position="static"
    >
      <ModalDialog id="header" onClose={handleOnClickAdd} open={open}>
        <AddContent id="header-modal" onClose={handleOnClickAdd} />
      </ModalDialog>
      <Container>
        <Toolbar className={classes.toolbar} variant="dense">
          <img
            alt="logo"
            className={classes.image}
            src={Logo}
            onClick={handleOnClickHome}
          />
          <Search id="header-search" />
          <div className={classes.options}>
            <HomeIcon className={classes.option} fontSize="large" onClick={handleOnClickHome} />
            <AddIcon className={classes.option} fontSize="large" onClick={handleOnClickAdd} />
            <Avatar
              className={classes.avatar}
              src={avatar ? avatar : null}
              onClick={location.pathname === `/${userName}` ? preventDefault : handleOnRedirect}
            >
              {!avatar &&
                <Typography className={classes.typography} onClick={handleOnClickProfile}>
                  {getNameInitials(name)}
                </Typography>
              }
            </Avatar>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

Header.propTypes = {
  classes : PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default withStyles(styles)(Header);
