// @flow

import React from 'react';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add'

function LinkInput() {
  return (
    <React.Fragment>
      <Grid item xs={11}>
        <TextField id="name" label="Name" margin="none" fullWidth/>
      </Grid>
      <Grid item xs={1}>
      <Button variant="fab" mini color="secondary" aria-label="add">
          <AddIcon />
        </Button>
      </Grid>
    </React.Fragment>
  );
}

export default LinkInput;
