// @flow

import * as React from 'react';
import Grid from 'material-ui/Grid';
import type {FlickrBookmark} from '../../type';
import Typography from 'material-ui/Typography';

type Props = {
  bookmark: FlickrBookmark
};

export default ({bookmark: {width, height}}: Props) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography>
          Size: {width}x{height}
        </Typography>
      </Grid>
    </React.Fragment>
  );
};
