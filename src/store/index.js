import {createStore} from 'redux';

import link from './reducers/link';

export default createStore(
  link,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
