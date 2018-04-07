// @flow
import type {Action} from '../actions/type';
import type {LinkNotFetchedAction} from '../actions/link';


const initialState = {
  isLoading: false,
  error: null
};

type State = {
  error: ?string,
  isLoading: boolean
};

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
      const {payload} = ((action: any): LinkNotFetchedAction) 
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    }
    case 'DUPLICATE_LINK': {
      return {
        ...state,
        isLoading: false,
        error: 'Link is already there'
      }
    }
  }
  return state;
}
