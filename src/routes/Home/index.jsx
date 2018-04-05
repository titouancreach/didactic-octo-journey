// @flow

import React from 'react';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import LinkInput from '../../components/LinkInput/index';

const style = {
  root: {
    margin: 64
  }
};

type Props = {
  classes: typeof style
};

function Home({classes}: Props) {
  return (
    <div className={classes.root}>
      <Grid container>
        <LinkInput />
      </Grid>
    </div>
  );
}

export default withStyles(style)(Home);
