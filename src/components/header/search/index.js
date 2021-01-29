// @packages
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { SEARCH } from '../../../gql/user';

// @styles
import styles from './styles';

const Search = ({ classes, id }) => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const { data, loading } = useQuery(SEARCH, {
    variables: { search }
  });

  const handleOnChange = ({ target: { value }}) => {
    setSearch(value);
  };

  const handleOnRedirect = (userName) => {
    history.push(`/${userName}`);
    setSearch('');
  };

  return (
    <Box className={classes.searchPage}>
      <Box className={classes.search} id={id}>
        <Box className={classes.searchIcon}>
          {loading ? <CircularProgress size={20} /> : <SearchIcon />}
        </Box>
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleOnChange}
          placeholder="Search…"
          value={search}
        />
      </Box>
      {(data && search) &&
        <Paper className={classes.searches} elevation={3}>
          {(data && data.search) &&
            <List className={classes.list}>
              {data.search.map(item => [
                <ListItem
                  button
                  key={item.id}
                  onClick={() => handleOnRedirect(item.userName)}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.username} src={item.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.userName} secondary={item.name} />
                </ListItem>,
                <Divider key={`${item.id}-divider`} />
              ])}
            </List>
          }
          {!data.search.length &&
            <Typography className={classes.notFound}>
              No se encontró nada
            </Typography>
          }
        </Paper>
      }
    </Box>
  )
}

Search.propTypes = {
  classes : PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default withStyles(styles)(Search);
