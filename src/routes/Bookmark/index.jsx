// @flow

import * as React from 'react';
import {connect} from 'react-redux'; 
import BookmarkNotFound from '../../components/NotFound/bookmark';
import BookmarkEdit from '../../components/BookmarkEdit/index';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';

const isValidBookmarkId = (bookmarkId, allBookmarkIds) => {
  return !!allBookmarkIds.find(id => bookmarkId === id);
}


const style = {
  root: {
    margin: 64
  }
};

const Bookmark = ({match, allBookmarkIds, classes}) => {

  const {bookmarkId} = match.params;
  
  if (!isValidBookmarkId(bookmarkId, allBookmarkIds)) {
    return (
      <BookmarkNotFound />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <BookmarkEdit bookmarkId={bookmarkId} />
      </Grid>
    </div>
    
  );
};

const mapState = state => {
  return {
    allBookmarkIds: state.link.allIds
  };
}

export default withStyles(style)(connect(mapState)(Bookmark));
