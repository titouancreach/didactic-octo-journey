// @flow

import * as React from 'react';
import FlickrInfo from './FlickInfo';
import type {Bookmark} from '../../type';

type Props = {
  bookmark: Bookmark
};

export default ({bookmark}: Bookmark) => {
  return <FlickrInfo bookmark={bookmark} />;
};
