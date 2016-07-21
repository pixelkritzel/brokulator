import React, { Component } from 'react';
import { observer } from 'mobx-react';

import AccountForm from './AccountForm';
import AccountsList  from './AccountsList';

import store from '../stores/store';

@observer
export default class Accounts extends Component {
  showAddAccountForm = () => {
    store.appState.accounts.showAddAccountForm = true;
  }

  hideAddAccountForm = () => {
    store.appState.accounts.showAddAccountForm = false;
  }

  render() { 
    return(
      <div className="row">
        { store.appState.accounts.showAddAccountForm ? 
          <div className="col-sm-4"><AccountForm closeForm={ this.hideAddAccountForm } method="create" /></div>
          : <button type="button" className="btn btn-primary" onClick={ this.showAddAccountForm } >Add Account</button>
        }
        { store.appState.accounts.showAddAccountForm ?
          <div className="col-sm-8"><AccountsList /></div>
          : <AccountsList />
        }
      </div>
    )
  }
}