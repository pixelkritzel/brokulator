import React, { Component } from 'react';

import extractFormData from '../helper/extractFormData';

import TransactionList from './TransactionList';

import TransactionStore  from '../stores/TransactionStore';

const AccountStore = {
  accounts: [{ id: 0, name: "Sparkasse"}, { id:1, name:"Geldspeicher"}]
}

export default class TransactionForm extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    const formData = extractFormData(event.target);
    for (let key in formData) {
      if (typeof formData === 'string') {
        formData[key] = formData[key].trim()
      }
    }
    try {
     TransactionStore.addTransaction(formData);
    } catch (error) {
      alert(error);
    }

  }

  render() {
    return(
      <form className="form-horizontal" onSubmit={ this.onSubmit } >
        <h3>New Transaction</h3>
        <div className="form-group">
          <label for="transactionName" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-10">
            <input type="text" name="name" className="form-control" id="transactionName" placeholder="Name" />
          </div>
        </div>
        <div className="form-group">
          <label for="transactionAmount" className="col-sm-2 control-label">Amount</label>
          <div className="col-sm-10">
            <input type="number" name="amount" className="form-control" id="transactionAmount" placeholder="Amount" />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-sm-2 control-label">Type</label>
          <div className="col-sm-10">
            <label className="radio-inline">
              <input type="radio" name="transactionType" value="in" /> Income
            </label>
            <label className="radio-inline">
              <input type="radio" name="transactionType" value="out" /> Spending
            </label>
          </div>
        </div>
        <div className="form-group">
          <label for="transactionSchedule" className="col-sm-2 control-label">Schedule</label>
          <div className="col-sm-10">
            <input type="date" name="schedule" className="form-control" id="transactionSchedule" placeholder="Schedule" />
          </div>
        </div>
        <div className="form-group">
          <label for="transactionRepetition" className="col-sm-2 control-label">Repetition</label>
          <div className="col-sm-10">
            <select className="form-control" name="repetition" id="transactionRepetition" defaultValue="never">
              <option value="never">Never</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quartly</option>
              <option value="half-yearly">Half-yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label for="transactionAccount" className="col-sm-2 control-label">Account</label>
          <div className="col-sm-10">
            <select className="form-control" name="_accountId" id="transactionAccount">
              <option value="">Please select an account</option>
              { AccountStore.accounts.map( account => <option value={ account.id }>{ account.name }</option> ) }
            </select>
          </div>
        </div>
        <div className="text-right">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    )
  }
}