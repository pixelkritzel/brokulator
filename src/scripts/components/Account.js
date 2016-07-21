import React, { Component } from 'react';
import { observer } from 'mobx-react';

import AccountForm from './AccountForm';

import store from '../stores/store';

const DisplayAccount = function(account) { return(
  <dl>
    <dt>Name</dt>
    <dd>{ account.name }</dd>
    <dt>Balance</dt>
    <dd>{ account.balance }</dd>
  </dl>
)}

@observer
export default class Account extends Component {
  delete = () => {
    store.accounts.delete(this.props.account.id);
  }

  enterEdit = () => {
    this.setState({ showEditForm: true });
  }

  leaveEdit = () => {
    this.setState({ showEditForm: false });
  }

  render() {
    const showEditForm = this.state && this.state.showEditForm;
    const { account } = this.props;
    const gridClassName = store.appState.accounts.showAddAccountForm ? 'col-sm-6' : 'col-sm-4';
    return(
      <li className={ gridClassName }>
        <div className="btn-group" role="group" aria-label="Actions for Account { account.name }">
          <button type="button" className="btn btn-default" onClick={ this.delete } >Delete</button>
          <button type="button" className="btn btn-default" onClick={ this.enterEdit }>Edit</button>
        </div>
        { showEditForm ?
          <AccountForm account={ account } closeForm={ this.leaveEdit } method="update" />
          : DisplayAccount(account) }  
      </li>
    )
  }
}