import { observable, action } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';
import generateId from '../helper/generateId';

function validateAccount(account) {
  const errorMessages = [];
  if(!account.name) errorMessages.push('Account misses name');
  if(!account.balance) errorMessages.push('Account misses balance');
  if (errorMessages.length > 0) {
    errorMessages.unshift('Errors in transaction');
    return errorMessages;
  }
}

export default class Account extends SaveableMixinFactory() {
  keysToExport = ['id', 'creationDateString', 'updateDateString', 'name', 'balance']

  updateDateString = ''
  @observable name; 
  @observable balance;

   @action update(data) {
     const newData = { ...(this.exportData()), data }
     const error = validateAccount(newData);
     if (error) throw new Error(error.join('\n'));
     data.updateDateString = (new Date()).toString();
     Object.assign(this, data);
     this.balance = parseInt(this.balance, 10);
     return this;
   }

  constructor(accountData) {
    super(...arguments);
    const error = validateAccount(accountData);
    if (error) throw new Error(error.join('\n'));
    this.id = accountData.id || generateId();
    this.creationDateString = accountData.creationDateString || (new Date()).toString();
    this.name = accountData.name;
    this.balance = parseInt(accountData.balance, 10);
  }
}