// @packages
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import ChangePassword from './change-password';
import EditProfileInfo from './edit-profile-info';

// @styles
import styles from './styles';

// @const
const menuitem = [
  {id: 1, description: 'Editar perfil'},
  {id: 2, description: 'Cambiar contraseña'}
];

const EditUserProfilePage = ({ classes }) => {
  const [selected, setSelected] = useState(1);

  const getMenuContent = () => {
    switch (selected) {
      case 1:
        return <EditProfileInfo />;
      case 2:
        return <ChangePassword />;
      default:
        return null;
    }
  };

  const handleOnSelect = (id) => {
    setSelected(id);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={0}>
            <List className={classes.list} component="nav">
              {menuitem.map(item => [
                  <ListItem
                    button
                    className={classes.listItem}
                    classes={{ selected: classes.selected }}
                    key={`${item.id}-list-item`}
                    onClick={() => handleOnSelect(item.id)}
                    selected={selected === item.id}
                  >
                    <ListItemText primary={item.description} />
                  </ListItem>,
                  <Divider key={`${item.id}-divider`} />
                ])}
              </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper} elevation={0}>
            {getMenuContent()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

EditUserProfilePage.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(EditUserProfilePage);
