// @flow

import {getUniqId} from '../../helpers';
import {get} from '../../services/flickr';
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

export type Actions = AddLinkAction | FetchLinkAction | LinkNotFetchedAction | DeleteLinkAction;


export function deleteLink(id: string) {
  return {type: 'DELETE_LINK', payload: {id}}
};

export function fetchLink(url: UrlType): Function {
  return (dispatch, getState) => {

    // check for already existing bookmark.
    // we assume that 2 links are the same if their URL are equals
    const state = getState();
    const bookmarks = state.link.allIds.map(id => state.link.byId[id]);
    const bookmark = bookmarks.find(link => link.url === url);
    if (bookmark) {
      dispatch({type: 'DUPLICATE_LINK', payload: {
        id: bookmark.id
      }});
      return;
    }

    const id = getUniqId();
    dispatch({type: 'FETCH_LINK'});
    get(url).fold(
      prom =>
        prom.then(result =>
          result.fold(
            obj => 
              dispatch({
                type: 'ADD_LINK',
                payload: {
                  ...obj,
                  id
                }
              }),
            err => dispatch({type: 'LINK_NOT_FETCHED', payload: err})
          )
        ),
      err => dispatch({type: 'LINK_NOT_FETCHED', payload: err})
    );
  };
}
