import {createStore, compose} from 'redux';
import {install} from 'redux-loop';

import link from './reducers/link';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(install());

export default createStore(link, enhancer);
