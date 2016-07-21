import React, { Component } from 'react';
import { observer } from 'mobx-react';

import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

import store from '../stores/store';

@observer
export default class Transactions extends Component {

  showAddTransactionForm = () => {
    store.appState.transactions.showAddTransactionForm = true;
  }

  hideAddTransactionForm = () => {
    store.appState.transactions.showAddTransactionForm = false;
  }

  render() { 
    return(
      <div className="row">
        <h1>Transactions!</h1>
        { store.appState.transactions.showAddTransactionForm ? 
          <div className="col-sm-4"><TransactionForm closeForm={ this.hideAddTransactionForm } method="create" /></div>
          : <button type="button" className="btn btn-primary" onClick={ this.showAddTransactionForm } >Add Transaction</button>
        }
        { store.appState.transactions.showAddTransactionForm ?
          <div className="col-sm-8"><TransactionList /></div>
          : <TransactionList />
        }
      </div>
    )
  }
}
