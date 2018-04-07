// @flow

import * as React from 'react';
import {ListItemText} from 'material-ui/List';

type Props = {
  bookmarkId: string
}

const BookmarkItem = ({bookmarkId} : Props) => {
  return (
    <ListItemText primary={bookmarkId} secondary="titouan" />
  )
};

export default BookmarkItem;
