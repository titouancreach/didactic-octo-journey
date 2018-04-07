// @flow

import * as React from 'react';
import {ListItemText} from 'material-ui/List';
import {connect} from 'react-redux';
import type {Bookmark} from '../../type';

type Props = {
  bookmark: Bookmark
};

const makeSecondaryLine = ({title, authorName, addedDate}: Bookmark) =>
  `title: ${title} / author: ${authorName} / added: ${addedDate}`;

const BookmarkItem = ({bookmark}: Props) => {
  return (
    <ListItemText
      primary={bookmark.url}
      secondary={makeSecondaryLine(bookmark)}
    />
  );
};

const mapState = (state, {bookmarkId}) => ({
  bookmark: state.link.byId[bookmarkId]
});

export default connect(mapState)(BookmarkItem);
