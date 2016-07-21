import React, { Component } from 'react';
import { observer } from 'mobx-react';

import TransactionForm from './TransactionForm';

import store from '../stores/store';

const DisplayTransaction = function(transaction) { return(
  <dl>
    <dt>Name</dt>
    <dd>{ transaction.name }</dd>
    <dt>Amount</dt>
    <dd>{ transaction.amount }</dd>
    <dt>Type</dt>
    <dd>{ transaction.transactionType }</dd>
    <dt>Schedule</dt>
    <dd>{ transaction.schedule }</dd>
    <dt>Repetition</dt>
    <dd>{ transaction.repetition }</dd>
    <dt>Account</dt>
    <dd>{ transaction.account && transaction.account.name }</dd>
  </dl>
)}

@observer
export default class Transaction extends Component {
  delete = () => {
    store.transactions.delete(this.props.transaction.id);
  }

  enterEdit = () => {
    this.setState({ showEditForm: true });
  }

  leaveEdit = () => {
    this.setState({ showEditForm: false });
  }

  render() {
    const showEditForm = this.state && this.state.showEditForm;
    const { transaction } = this.props;
    const gridClassName = store.appState.transactions.showAddTransactionForm ? 'col-sm-6' : 'col-sm-4';
    return(
      <li className={ gridClassName }>
        <div className="btn-group" role="group" aria-label="Actions for Transaction { transaction.name }">
          <button type="button" className="btn btn-default" onClick={ this.delete } >Delete</button>
          <button type="button" className="btn btn-default" onClick={ this.enterEdit }>Edit</button>
        </div>
        { showEditForm ?
          <TransactionForm transaction={ transaction } closeForm={ this.leaveEdit } method="update" />
          : DisplayTransaction(transaction) }  
      </li>
    )
  }
}