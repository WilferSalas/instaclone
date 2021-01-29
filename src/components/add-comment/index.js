// @packages
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const AddComment = ({
  classes,
  onChange,
  onClick,
  value
}) => (
  <Grid container>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={9}>
      <InputBase
        className={classes.input}
        fullWidth
        onChange={onChange}
        placeholder="Agregar un comentario..."
        value={value}
      />
    </Grid>
    <Grid className={classes.postComment} item xs={3}>
      <Button
        className={classes.postButton}
        color="primary"
        disabled={!value}
        onClick={onClick}
      >
        Publicar
      </Button>
    </Grid>
  </Grid>
)

AddComment.propTypes = {
  classes : PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default withStyles(styles)(AddComment);
