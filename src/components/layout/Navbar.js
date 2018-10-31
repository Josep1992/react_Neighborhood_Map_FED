import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  root: {
    flexGrow: 1,
    color: 'red',
  },
};

const Navbar = (props) => {
  const { classes, tagline, onHandleToggle } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color={classes.color}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <FontAwesomeIcon icon={faBars} onChange={onHandleToggle} />{' '}
            {` ${tagline}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
