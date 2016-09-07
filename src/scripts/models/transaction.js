import { observable, computed, action } from 'mobx';
import moment from 'moment';

import SaveableMixinFactory from '../helper/SaveableMixin';
import generateId from '../helper/generateId';
import calculateMonthDiff from '../helper/calculateMonthDiff';
import store from '../stores/store';

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

const testDateFunctions = new Map();

const testDateNever = function(momentDay, periodType, transaction) {
  if (periodType === 'days') { 
    return moment(transaction.schedule).isSame(momentDay, 'day')
  };
  if (periodType === 'months') {
    const beginOfMonth = momentDay.clone().startOf('month');
    const endOfMonth = momentDay.clone().endOf('month');
    return moment(transaction.schedule).isBetween(beginOfMonth, endOfMonth, null, '[]');
  }
}

testDateFunctions.set('never', testDateNever);

const testDateMonthly = function(momentDay, periodType, transaction) {
  const today = moment();
  const isCurrentMonth = momentDay.isSame(today, 'month');
  const monthDiff = calculateMonthDiff(moment(transaction.schedule), momentDay);
  const transactionScheduleDate = moment(transaction.schedule).add(monthDiff, 'month');
  if (periodType === 'days') {
    return transactionScheduleDate.isSame(momentDay, 'day');
  }
  if (periodType === 'months') {
    const startDate = isCurrentMonth ? today : momentDay.clone().startOf('month');
    const endDate = momentDay.clone().endOf('month');
    const result =  transactionScheduleDate.isBetween(startDate, endDate, null, '[]');
    return result
  }
}

testDateFunctions.set('monthly', testDateMonthly);

export default class TransactionModel extends SaveableMixinFactory() {
  keysToExport = ['id', 'creationDateString', 'updateDateString', 'name', 'amount', 'transactionType', 'schedule', 'repetition', '_accountId']

  updateDateString = '' 
  @observable name
  @observable amount
  @observable transactionType
  @observable schedule
  @observable repetition
  @observable _accountId

  @computed get account() {
    return store.accounts.all.find( account => account.id == this._accountId )
  }

 @action update(data) {
   const newData = { ...(this.exportData()), data }
   const error = validateTransaction(newData);
   if (error) throw new Error(error.join('\n'));
   data.updateDateString = (new Date()).toString();
   Object.assign(this, data);
   this.amount = parseInt(this.amount, 10);
   return this;
 }

 testDate(momentDay, periodType) {
   return testDateFunctions.get(this.repetition)(momentDay, periodType, this);
 }

 apply(balance) {
   if(this.transactionType === 'in') {
     return balance + this.amount;
   }
   if(this.transactionType === 'out') {
     return balance - this.amount;
   }
 }

  constructor(transactionData) {
    super(...arguments);
    const error = validateTransaction(transactionData);
    if (error) throw new Error(error.join('\n'));
    this._accountId = transactionData._accountId;
    this.id = transactionData.id || generateId();
    this.creationDateString = transactionData.creationDateString || (new Date()).toString();
    this.name = transactionData.name;
    this.amount = parseInt(transactionData.amount, 10);
    this.transactionType = transactionData.transactionType;
    this.schedule = transactionData.schedule;
    this.repetition = transactionData.repetition;
  }
}