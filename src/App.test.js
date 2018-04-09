import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Error, Success} from './helpers';
import {get as flickrGet} from './services/flickr';
import {get as vimeoGet} from './services/vimeo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});



