import { observable, computed, action } from 'mobx';

import DataExportClass from '../helper/DataExportClass';
import generateId from '../helper/generateId';

const AccountStore = {
  accounts: [{ id: 0, name: "SPARDA"}, { id:1, name:"Geldspeicher"}]
}

function validateTransaction(transaction) {

  const errorMessages = [];
  if (!transaction.name) errorMessages.push('Transaction misses name');
  if (!transaction.amount) errorMessages.push('Transaction misses amount');
  if (!transaction.transactionType) errorMessages.push('Transaction misses transaction type');
  if (!transaction.schedule) errorMessages.push('Transaction misses schedule');
  if (!transaction.repetition) errorMessages.push('Transaction misses repetition type');
  if (!transaction._accountId) errorMessages.push('Transaction misses account');
  if (errorMessages.length > 0) {
    errorMessages.unshift('Errors in transaction');
    return errorMessages;
  }
}

export default class TransactionModel extends DataExportClass {
  keysToExport = ['id', 'creationDateString', 'updateDateString', 'name', 'amount', 'transactionType', 'schedule', 'repetition', '_accountId']

  @observable updateDateString = '' 
  @observable name
  @observable amount
  @observable transactionType
  @observable schedule
  @observable repetition
  @observable _accountId

  @computed get account() {
    return AccountStore.accounts.find( account => account.id == this._accountId )
  }

 @action update(data) {
   const newData = { ...(this.exportData()), data }
   const error = validateTransaction(newData);
   if (error) throw new Error(error.join('\n'));
   data.updateDateString = (new Date()).toString();
   Object.assign(this, data);
   return this;
 }

  constructor(transactionData) {
    super(...arguments);
    const error = validateTransaction(transactionData);
    if (error) throw new Error(error.join('\n'));
    this._accountId = transactionData._accountId;
    this.id = transactionData.id || generateId();
    this.creationDateString = transactionData.creationDateString || (new Date()).toString();
    this.name = transactionData.name;
    this.amount = transactionData.amount;
    this.transactionType = transactionData.transactionType;
    this.schedule = transactionData.schedule;
    this.repetition = transactionData.repetition;
  }
}