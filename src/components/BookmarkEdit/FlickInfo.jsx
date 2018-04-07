// @flow

import * as React from 'react';
import Grid from 'material-ui/Grid';
import type {FlickrBookmark} from '../../type';
import Typography from 'material-ui/Typography';

type Props = {
  bookmark: FlickrBookmark
};

export default ({bookmark}: Props) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        {' '}
        <Typography> Width: {bookmark.width}</Typography>{' '}
      </Grid>
      <Grid item xs={12}>
        {' '}
        <Typography>Height: {bookmark.height} </Typography>
      </Grid>
    </React.Fragment>
  );
};
