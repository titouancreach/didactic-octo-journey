// @flow

import * as React from 'react';
import FlickrInfo from './FlickInfo';
import type {Bookmark, FlickrBookmark} from '../../type';

type Props = {
  bookmark: Bookmark
};

export default ({bookmark}: Props) => {
  return <FlickrInfo bookmark={((bookmark: any): FlickrBookmark)} />;
};
