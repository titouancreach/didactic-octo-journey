// @flow
import type {Action} from '../actions/type';
import type {
  AddLinkAction,
  DeleteLinkAction,
  AddTagAction,
  RemoveTagAction
} from '../actions/link';
import {removeById, mapObject} from '../../helpers';

// store ordered list of ids when order matters,
// otherwise, store unordered objects for O(1) access
const initialState = {
  byId: {},
  allIds: []
};

type State = typeof initialState;

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ADD_LINK': {
      const {payload} = ((action: any): AddLinkAction);
      return {
        allIds: [...state.allIds, payload.id],
        byId: {
          ...state.byId,
          [payload.id]: payload
        }
      };
    }
    case 'DELETE_LINK': {
      const {payload} = ((action: any): DeleteLinkAction);
      return {
        allIds: [...state.allIds.filter(id => id !== payload.id)],
        byId: removeById(state.byId, id => id !== payload.id)
      };
    }

    case 'ADD_TAG': {
      const {payload} = ((action: any): AddTagAction);
      return {
        ...state,
        byId: mapObject(
          state.byId,
          (id, obj) =>
            id !== payload.id ? obj : {...obj, tags: [...obj.tags, payload.tag]}
        )
      };
    }

    case 'REMOVE_TAG': {
      const {payload} = ((action: any): RemoveTagAction);
      return {
        ...state,
        byId: mapObject(
          state.byId,
          (id, obj) =>
            id !== payload.id
              ? obj
              : {...obj, tags: obj.tags.filter(t => t !== payload.tag)}
        )
      };
    }
  }
  return state;
}
