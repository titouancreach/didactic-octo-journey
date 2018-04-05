// @flow
import type {Action} from '../actions/type';

const initialState = {
  byId: {},
  allIds: []
};

type State = typeof initialState;

export default function(state: State = initialState, action: Action): State {
  switch (action) {
    case 'ADD_LINK':
      return state;
  }
  return state;
}
