// @flow

import {getUniqId} from '../../helpers';
import {get} from '../../services/flickr';

type UrlType = string;
type IdType = string;

type FetchLinkAction = {
  payload: {
    url: UrlType
  },
  type: string
};

type AddLinkAction = Object;

export type Actions = AddLinkAction | FetchLinkAction;

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
