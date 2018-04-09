// @flow

import * as React from 'react';
import Home from './routes/Home';
import AppBar from './components/AppBar/index';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Bookmark from './routes/Bookmark/index';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

class App extends React.Component<{}> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  }
}

export default App;
