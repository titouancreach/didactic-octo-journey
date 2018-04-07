// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import type {Bookmark} from '../../type';
import Grid from 'material-ui/Grid';
import GenericInput from '../GenericInput';
import ChipInput from 'material-ui-chip-input';
import {withRouter} from 'react-router-dom';
import Button from 'material-ui/Button';
import BookmarkInfo from './BookmarkInfo';
import Typography from 'material-ui/Typography';

import {addTag, removeTag} from '../../store/actions/link';

type Props = {
  bookmark: Bookmark,
  addTag: Function,
  removeTag: Function,
  history: any
};

// High order function to avoid duplicate
const enhanceAddTag = tags => {
  return (onSuccess, onError) => {
    return tag => {
      if (!tags.includes(tag)) {
        return onSuccess(tag);
      }
      return onError(tag);
    };
  };
};

function BookmarkEdit({bookmark, addTag, removeTag, history}: Props) {

  return (
    <React.Fragment>
      <Grid item xs={12}>
      <Typography variant="display2">Edit</Typography>
      </Grid>
      <BookmarkInfo bookmark={bookmark} />
      <Grid item xs={12}>
        <ChipInput
          label="tags"
          fullWidth
          value={bookmark.tags}
          onAdd={addTag}
          onDelete={removeTag}
          helperText="Type something and press 'enter' to add new keywords"
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-end">
          <Grid item xs={2}>
            <Button
              size="medium"
              color="secondary"
              variant="raised"
              onClick={() => history.push('/')}
            >
              Back to home
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapState = (state, {bookmarkId}) => {
  return {
    bookmark: state.link.byId[bookmarkId]
  };
};

const mapDispatch = (dispatch, {bookmarkId}) => {
  return {
    addTag: tag => dispatch(addTag(bookmarkId, tag)),
    removeTag: tag => dispatch(removeTag(bookmarkId, tag))
  };
};

export default withRouter(connect(mapState, mapDispatch)(BookmarkEdit));
