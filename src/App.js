// @flow

import * as React from 'react';
import Home from './routes/Home';
import AppBar from './components/AppBar/index';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Bookmark from './routes/Bookmark/index';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <AppBar title="Bookmark" />
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/bookmark/:bookmarkId" component={Bookmark} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
