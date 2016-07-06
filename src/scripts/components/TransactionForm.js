import React, { Component } from 'react';

import extractFormData from '../helper/extractFormData';

import TransactionList from './TransactionList';

import store  from '../stores/store';

const AccountStore = {
  accounts: [{ id: 0, name: "Sparkasse"}, { id:1, name:"Geldspeicher"}]
}

export default class TransactionForm extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    const { method } = this.props;
    const previousTransactionData = this.props.transaction || Object.create(null);
    const formData = extractFormData(event.target);
    for (let key in formData) {
      if (typeof formData === 'string') {
        formData[key] = formData[key].trim()
      }
    }
    if (method === 'create') {
      try {
        store.transactions.addTransaction(formData);
        this.props.closeForm();
      } catch (error) {
        alert(error);
      }
    }
    if (method === 'update') {
      try {
        store.transactions.all
             .find( transaction => transaction.id === previousTransactionData.id )
             .update({ ...previousTransactionData,...formData});
        this.props.closeForm();
      } catch (error) {
        alert(error);
      }
    }
    
  }

  closeFormIfEscapePressed = event => {
    if (event.keyCode == 27) { this.props.closeForm() };
  }

  componentDidMount() {
    window.addEventListener('keyup', this.closeFormIfEscapePressed);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeFormIfEscapePressed);
  }

  render() {
    const transaction = this.props.transaction || { transactionType: 'in' };
    const title = this.props.method === 'create' ? 'New Transaction' : 'Edit Transaction'
    return(
      <form onSubmit={ this.onSubmit } onKeyUp={ this.onKeyUp } >
        <h3>{ title }</h3>
        <div className="form-group">
          <label for="transactionName" className="control-label">Name</label>
            <input type="text" name="name" className="form-control" id="transactionName" placeholder="Name" value={ transaction.name } />
        </div>
        <div className="form-group">
          <label for="transactionAmount" className="control-label">Amount</label>
            <input type="number" name="amount" className="form-control" id="transactionAmount" placeholder="Amount" value={ transaction.amount }/>
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
          <label for="transactionSchedule" className="control-label">Schedule</label>
            <input type="date" name="schedule" className="form-control" id="transactionSchedule" placeholder="Schedule" value={ transaction.schedule } />
        </div>
        <div className="form-group">
          <label for="transactionRepetition" className="control-label">Repetition</label>
            <select className="form-control" name="repetition" id="transactionRepetition" defaultValue={ transaction.repeition }>
              <option value="never" >Never</option>
              <option value="weekly" >Weekly</option>
              <option value="monthly" >Monthly</option>
              <option value="quarterly" >Quartly</option>
              <option value="half-yearly" >Half-yearly</option>
              <option value="yearly" >Yearly</option>
            </select>
        </div>
        <div className="form-group">
          <label for="transactionAccount" className="control-label">Account</label>
            <select className="form-control" name="_accountId" id="transactionAccount" defaultValue={ transaction._accountId } >
              <option value="">Please select an account</option>
              { AccountStore.accounts.map( account => <option value={ account.id } key={ account.id }>
                                                        { account.name }
                                                      </option> ) }
            </select>
        </div>
        <div className="text-right">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    )
  }
}