import React, { Component } from 'react';

import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

export default class Transactions extends Component {
  render() {
    return(
      <div>
        <TransactionForm method="create" />
        <TransactionList />
      </div>
    )
  }
}