import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Transaction from './Transaction';

import store from '../stores/store';

@observer
export default class TransactionList extends Component {
  render() {
    return(
      <ul className="row list-unstyled">
        { store.transactions.all.map( transaction => {
          return <Transaction transaction={ transaction } key={ transaction.id } />}
        ) }
      </ul>
    )
  }
}