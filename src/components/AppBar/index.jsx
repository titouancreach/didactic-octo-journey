// @flow

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  }
};

type Props = {
  classes: typeof styles,
  title: string,
  history: any
};

function TopBar({classes, title, history}: Props) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" onClick={() => history.push('/')}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(withStyles(styles)(TopBar));
