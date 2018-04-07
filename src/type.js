// @flow

type LinkType = 'flickr' | 'vimeo';

export type Bookmark = {
  url: string,
  title: string,
  authorName: string,
  addedDate: string,
  tags: [string],
  type: LinkType
};

export type FlickrBookmark = Bookmark & {
  width: string,
  height: string
}

export type VimeoBookmark = Bookmark & {
  width: string,
  height: string,
  duration: string
}
