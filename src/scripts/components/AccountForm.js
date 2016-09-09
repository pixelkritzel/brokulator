import React from 'react';

import FormComponent from '../helper/FormComponent';

import extractFormData from '../helper/extractFormData';
import store  from '../stores/store';

export default class Account extends FormComponent {

  create(formData) {
    try {
      store.accounts.add(formData);
      this.props.closeForm();
    } catch (error) {
      alert(error);
    }
  }

  update(formData) {
    const previousAccountData = this.props.account || Object.create(null);
    try {
      store.accounts.all
            .find( account => account.id === previousAccountData.id )
            .update({ ...previousAccountData,...formData});
      this.props.closeForm();
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const account = this.props.account || {} ;
    const title = this.props.method === 'create' ? 'New Account' : 'Edit Account'
    return(
      <form onSubmit={ this.applyChanges } onKeyUp={ this.onKeyUp } >
        <h3>{ title }</h3>
        <div className="form-group">
          <label htmlFor="accountName" className="control-label">Name</label>
            <input type="text" name="name" className="form-control" id="accountName" placeholder="Name" defaultValue={ account.name } />
        </div>
        <div className="form-group">
          <label htmlFor="accountBalance" className="control-label">Balance</label>
            <input type="number" name="balance" className="form-control" id="accountBalance" placeholder="Balance" defaultValue={ account.balance }/>
        </div>
        <div className="text-right">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    )
  }
}