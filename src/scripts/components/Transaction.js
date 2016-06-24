import React, { Component } from 'react';

export default class Transaction extends Component {
  render() {
    const { transaction } = this.props
    return(
      <li>
        { transaction.name }
        { transaction.account.name }
      </li>
    )
  }
}