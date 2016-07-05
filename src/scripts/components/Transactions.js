import React, { Component } from 'react';

import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

export default class Transactions extends Component {
  showTransactionForm = () => {
    this.setState({ showTransactionForm: true });
  }

  hideTransactionForm = () => {
    this.setState({ showTransactionForm: false });
  }

  render() {
    const showTransactionForm = this.state && this.state.showTransactionForm; 
    return(
      <div>
        { showTransactionForm ? 
          <TransactionForm closeForm={ this.hideTransactionForm } method="create" />
          : <button type="button" className="btn btn-primary" onClick={ this.showTransactionForm } >Add Transaction</button>
        }
        <TransactionList />
      </div>
    )
  }
}