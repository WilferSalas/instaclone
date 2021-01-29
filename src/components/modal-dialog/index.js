// @packages
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const ModalDialog = ({
  children,
  classes,
  id,
  maxWidth,
  onClose,
  open
}) => {
  return (
    <Dialog
      className={classes.dialog}
      id={id}
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}
    >
      {children}
    </Dialog>
  )
}

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  maxWidth: PropTypes.oneOf(['md', 'sm', 'xl', 'xs', 'lg', false]),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

ModalDialog.defaultProps = {
  maxWidth: 'sm'
}

export default withStyles(styles)(ModalDialog);
