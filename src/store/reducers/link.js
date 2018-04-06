// @flow
import type {Action} from '../actions/type';

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
      return {
        allIds: [...state.allIds, action.payload.id],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      };
    }
  }
  return state;
}
