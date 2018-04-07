// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import type {Bookmark} from '../../type';
import Grid from 'material-ui/Grid';
import GenericInput from '../GenericInput';

type Props = {
  bookmark: Bookmark
};

type State = {
  input: string
};

class BookmarkEdit extends React.Component<Props, State> {
  state = {
    input: ''
  };

  render() {
    const {bookmark} = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12}>
          {' '}
          Bookmark edit here{' '}
        </Grid>
        <GenericInput
          buttonDisabled={false}
          error={null}
          title="tag name"
          onClick={() => {}}
        />
        <Grid item xs={12}>
          {bookmark.tags.length ? (
            bookmark.tags.map(tagName => {
              // our tagNames are guaranteed to be unique :)
              return <Chip key={tagName} label={tagName} onDelete={() => {}} />;
            })
          ) : (
            <div> No tags </div> // TODO: create component here
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapState = (state, {bookmarkId}) => {
  return {
    bookmark: state.link.byId[bookmarkId]
  };
};

export default connect(mapState)(BookmarkEdit);
