import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Transaction extends Component {
  render() {
    const { transaction } = this.props
    return(
      <li>
        <dl class="dl-horizontal">
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
          <dd>{ transaction.account.name }</dd>
        </dl>
      </li>
    )
  }
}