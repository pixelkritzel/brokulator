import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Navbar from './components/Navbar';

import appStateStore from './stores/appStateStore';
import getView from './router';

import DevTools from 'mobx-react-devtools';



@observer
class App extends Component {
  render() {
    const CurrentView = getView(appStateStore.route);
    return (
      <div>
        <Navbar />
        <div className="container">
          <CurrentView />
        </div>  
        <DevTools />
      </div>
    );
  }
};

export default App;