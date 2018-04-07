// @flow

import * as React from 'react';
import Grid from 'material-ui/Grid';
import type {VimeoBookmark} from '../../type';
import Typography from 'material-ui/Typography';

type Props = {
  bookmark: VimeoBookmark
};

export default ({bookmark: {width, height, duration}}: Props) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography>
          Size: {width}x{height}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Duration: {duration}s</Typography>
      </Grid>
    </React.Fragment>
  );
};
