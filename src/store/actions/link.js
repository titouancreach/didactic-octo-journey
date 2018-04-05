// @flow

import {getUniqId} from '../../helpers';

type Linktype = 'Vimeo' | 'Flickr';
type UrlType = string;
type IdType = string;

type AddLinkAction = {
  payload: {
    url: UrlType,
    type: Linktype,
    id: IdType
  },
  type: string
};

export type Actions = AddLinkAction;

export function addLink(url: UrlType, type: Linktype): AddLinkAction {
  const id = getUniqId();
  return {
    payload: {
      url,
      type,
      id
    },
    type: 'ADD_LINK'
  };
}
