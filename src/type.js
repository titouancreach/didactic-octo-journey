// @flow

export type Bookmark {
  url: string,
  title: string,
  authorName: string,
  addedDate: string,
  tags: [string]
};

export type FlikrBookmark = Bookmark & {
  width: string,
  height: string
}
