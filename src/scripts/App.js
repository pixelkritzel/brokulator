import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';

import store from './stores/store';
import getView from './router';

import DevTools from 'mobx-react-devtools';



@observer
class App extends Component {
  render() {
    const CurrentView = getView(store.appState.route);
    return (
      <div>
        <Navbar />
        <Alert />
        <div className="container">
          <CurrentView />
        </div>  
        <DevTools />
      </div>
    );
  }
};

export default App;