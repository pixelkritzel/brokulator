import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

import FormComponent from '../helper/FormComponent';

import store  from '../stores/store';

@observer
export default class TransactionForm extends FormComponent {

  create(formData) {
    try {
      store.transactions.add(formData);
      this.props.closeForm();
    } catch (error) {
      alert(error);
    }
  }

  update(formData, eventType) {
    const previousTransactionData = this.props.transaction || Object.create(null);
    try {
      store.transactions.all
           .find( transaction => transaction.id === previousTransactionData.id )
           .update({ ...previousTransactionData, ...formData});
      if (eventType === 'submit') {
        this.props.closeForm();
      }
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const transaction = this.props.transaction || { transactionType: 'in' };
    const title = this.props.method === 'create' ? 'New Transaction' : 'Edit Transaction'
    const accounts = store.accounts.all
    return(
      <form onSubmit={ this.applyChanges } >
        <h3>{ title }</h3>
        <div className="form-group">
          <label htmlFor="transactionName" className="control-label">Name</label>
            <input type="text" name="name" className="form-control" id="transactionName" placeholder="Name" defaultValue={ transaction.name } />
        </div>
        <div className="form-group">
          <label htmlFor="transactionAmount" className="control-label">Amount</label>
            <input type="number" name="amount" className="form-control" id="transactionAmount" placeholder="Amount" defaultValue={ transaction.amount }/>
        </div>
        <div className="form-group">
          <label  className="control-label">Type</label>
          <div className="radio">
            <label className="radio-inline">
              <input type="radio" name="transactionType" value="in"
                     defaultChecked={ transaction.transactionType == 'in'}
              /> Income
            </label>
          </div>
          <div className="radio">
            <label className="radio-inline">
              <input type="radio" name="transactionType" value="out"
                     defaultChecked={ transaction.transactionType == 'out'}
              /> Spending
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="transactionSchedule" className="control-label">Schedule</label>
          <input type="date" name="schedule" className="form-control" id="transactionSchedule" placeholder="Schedule" defaultValue={ transaction.schedule || moment(new Date()).format('YYYY-MM-DD') } min={ moment(new Date()).format('YYYY-MM-DD') } />
        </div>
        <div className="form-group">
          <label htmlFor="transactionRepetition" className="control-label">Repetition</label>
            <select className="form-control" name="repetition" id="transactionRepetition" defaultValue={ transaction.repetition }>
              <option value="never" >Never</option>
              <option value="weekly" >Weekly</option>
              <option value="monthly" >Monthly</option>
              <option value="quarterly" >Quartly</option>
              <option value="half-yearly" >Half-yearly</option>
              <option value="yearly" >Yearly</option>
            </select>
        </div>
        { transaction.repetition === 'never' ?
          '' :
          <div className="form-group">
            <label htmlFor="transactionRepetitionEndDate" className="control-label">RepetitionEndDate</label>
            <input type="date" name="repetitionEndDate" className="form-control" id="transactionRepetitionEndDate" placeholder="Repetition End Date" defaultValue={ transaction.repetitionEndDate || ''} min={ moment(new Date()).format('YYYY-MM-DD') } />
          </div> }
        <div className="form-group">
          <label htmlFor="transactionAccount" className="control-label">Account</label>
            <select className="form-control" name="_accountId" id="transactionAccount" defaultValue={ transaction._accountId } >
              <option value="">Please select an account</option>
              { accounts.map( account => <option value={ account.id } key={ account.id }>{ account.name }</option> ) }
            </select>
        </div>
        <div className="text-right">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    )
  }
}