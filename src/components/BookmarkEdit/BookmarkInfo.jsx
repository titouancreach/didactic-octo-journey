// @flow

import * as React from 'react';
import FlickrInfo from './FlickInfo';
import VimeoInfo from './VimeoInfo';
import type {Bookmark, FlickrBookmark, VimeoBookmark} from '../../type';

type Props = {
  bookmark: Bookmark
};

export default ({bookmark}: Props) => {
  switch (bookmark.type) {
    case 'flickr': {
      return (<FlickrInfo bookmark={((bookmark: any): FlickrBookmark)} />);
    }

    case 'vimeo': {
      return (<VimeoInfo bookmark={((bookmark: any): VimeoBookmark)} />);
    }

    default: {
      throw new Error('Should never happen!');
    }
  }
  
};
