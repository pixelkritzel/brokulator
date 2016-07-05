import React, { Component } from 'react';
import store from '../stores/store'; 

export default class Link extends Component {
  navigate = (event) => {
    event.preventDefault();
    store.appState.navigateTo(this.props.route)
  }

  render() {
    return(
      <a href="#" className="btn btn-link" onClick={ this.navigate }>
        {this.props.label}
      </a>
    )
  }
}