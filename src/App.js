// @flow

import * as React from 'react';
import Home from './routes/Home';
import AppBar from './components/AppBar/index';
import {Provider} from 'react-redux';
import store from './store';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppBar title="Bookmark" />
          <div>
            <Home />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
