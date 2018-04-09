// @flow

import {getUniqId} from '../../helpers';
import {getFetcher} from '../../services';
import type {Bookmark} from '../../type';

type UrlType = string;

export type FetchLinkAction = {|
  payload: {
    url: UrlType
  },
  type: string
|};

type AddLinkActionPayload = Bookmark & {id: string};

export type AddLinkAction = {|
  payload: AddLinkActionPayload,
  type: string
|};

export type LinkNotFetchedAction = {|
  payload: string,
  type: string
|};

export type DeleteLinkAction = {|
  payload: {
    id: string
  },
  type: string
|};

export type AddTagAction = {|
  payload: {
    id: string,
    tag: string
  },
  type: string
|};

export type RemoveTagAction = AddTagAction;

export type Actions =
  | AddLinkAction
  | FetchLinkAction
  | LinkNotFetchedAction
  | DeleteLinkAction
  | AddTagAction
  | RemoveTagAction;

export function deleteLink(id: string) {
  return {type: 'DELETE_LINK', payload: {id}};
}

export function addTag(id: string, tag: string) {
  return {type: 'ADD_TAG', payload: {id, tag}};
}

export function removeTag(id: string, tag: string) {
  return {type: 'REMOVE_TAG', payload: {id, tag}};
}

export function fetchLink(url: UrlType): Function {
  return (dispatch, getState) => {
    // check for already existing bookmark.
    // we assume that 2 links are the same if their URL are equals
    // That's not 100% true because we don't really care about URL, we just extract the Id to call the API.
    // That's not 100% false because because technically, different link are differents, event if they point to
    // the same video/photo.
    const state = getState();
    const bookmarks = state.link.allIds.map(id => state.link.byId[id]);
    const bookmark = bookmarks.find(link => link.url === url);
    if (bookmark) {
      dispatch({
        type: 'DUPLICATE_LINK',
        payload: {
          id: bookmark.id
        }
      });
      return;
    }

    const id = getUniqId();
    dispatch({type: 'FETCH_LINK'});

    getFetcher(url)
      .flatMap(get => get(url))
      .fold(
        prom =>
          prom.then(result =>
            result.fold(
              obj =>
                dispatch({
                  type: 'ADD_LINK',
                  payload: {
                    ...obj,
                    id,
                    tags: []
                  }
                }),
              err => dispatch({type: 'LINK_NOT_FETCHED', payload: err})
            )
          ),
        err => dispatch({type: 'LINK_NOT_FETCHED', payload: err})
      );
  };
}
