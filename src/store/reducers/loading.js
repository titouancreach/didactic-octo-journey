// @flow
import type {Action} from '../actions/type';

// store ordered list of ids when order matters,
// otherwise, store unordered objects for O(1) access
const initialState = {
  isLoading: false,
  error: null
};

type State = typeof initialState;

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'FETCH_LINK': {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case 'ADD_LINK': {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case 'LINK_NOT_FETCHED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
  }
  return state;
}
