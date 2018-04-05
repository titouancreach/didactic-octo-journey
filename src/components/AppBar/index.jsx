// @flow

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

type styleProps = {
  root: {
    flexGrow: number
  }
};

type Props = {
  classes: styleProps,
  title: string
};

const styles = {
  root: {
    flexGrow: 1
  }
};

function TopBar({classes, title}: Props) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(TopBar);
