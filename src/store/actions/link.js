// @flow

import {getUniqId} from '../../helpers';

type UrlType = string;
type IdType = string;

type AddLinkAction = {
  payload: {
    url: UrlType,
    id: IdType
  },
  type: string
};

export type Actions = AddLinkAction;

export function addLink(url: UrlType): AddLinkAction {
  const id = getUniqId();
  return {
    payload: {
      url,
      id
    },
    type: 'ADD_LINK'
  };
}
