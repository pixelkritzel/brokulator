import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Navbar from './components/Navbar';

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
        <div className="container">
          <CurrentView />
        </div>  
        <DevTools />
      </div>
    );
  }
};

window.addEventListener('keyup', () => console.log('Some key was pressed'))

export default App;