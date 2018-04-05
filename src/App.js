// @flow

import * as React from 'react';
import logo from './logo.svg';
import Home from './routes/Home';
import AppBar from './components/AppBar/index';

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <AppBar title="Bookmark" />
        <p className="App-intro">
          <Home />
        </p>
      </div>
    );
  }
}

export default App;
