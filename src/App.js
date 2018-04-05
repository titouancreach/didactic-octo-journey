// @flow

import * as React from 'react';
import Home from './routes/Home';
import AppBar from './components/AppBar/index';

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <AppBar title="Bookmark" />
        <div>
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
