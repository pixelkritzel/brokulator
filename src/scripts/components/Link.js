import React, { Component } from 'react';
import appStateStore from '../stores/appStateStore'; 

export default class Link extends Component {
  navigate = () => {
    appStateStore.navigateTo(this.props.route)
  }

  render() {
    return(
      <button type="button" role="link" className="btn btn-link" onClick={ this.navigate }>
        {this.props.label}
      </button>
    )
  }
}