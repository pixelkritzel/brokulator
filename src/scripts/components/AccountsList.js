import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Account from './Account';

import store from '../stores/store';

@observer
export default class AccountList extends Component {
  render() {
    return(
      <div>
        <h1>AccountList</h1>
        <ul className="row list-unstyled">
          { store.accounts.all.map( account => {
            return <Account account={ account } key={ account.id } />}
          ) }
        </ul>
      </div>
    )
  }
}