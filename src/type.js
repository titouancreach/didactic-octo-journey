// @flow

export type Bookmark = {
  url: string,
  title: string,
  authorName: string,
  addedDate: string,
  tags: [string]
};

export type FlickrBookmark = Bookmark & {
  width: string,
  height: string
}
