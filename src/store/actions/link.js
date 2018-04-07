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

export type Actions = AddLinkAction | FetchLinkAction | LinkNotFetchedAction;

export function fetchLink(url: UrlType): Function {
  return dispatch => {
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
