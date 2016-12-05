import React, { Component } from 'react';
import { observer } from 'mobx-react';

import store from '../stores/store';



@observer
export default class Alert extends Component {
  render() { 
    return(
      store.alerts.length === 0 ?
        <div className="navbar-margin-bottom"></div>
      : <div className="alert alert-warning alert-dismissible" role="alert">
            { store.alerts.map( (alert, i) => <p key={ i } >{ alert }</p>) } 
        </div>
    )
  }
}