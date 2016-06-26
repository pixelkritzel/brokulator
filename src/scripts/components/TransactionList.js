import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Transaction from './Transaction';

import transactionStore from '../stores/TransactionStore';

@observer
export default class TransactionList extends Component {
  render() {
    console.log('store', transactionStore)
    return(
      <ul>
        { transactionStore.transactions.map( transaction => {
          return <Transaction transaction={ transaction } key={ transaction.id } />}
        ) }
      </ul>
    )
  }
}