import { observable, computed, action } from 'mobx';
import moment from 'moment';

import store from './store';

import calculateMonthDiff from '../helper/calculateMonthDiff'; 

function fnReduceBalanceOfStep(previousBalance, transaction) {
  return transaction.apply(previousBalance)
}

function createAccountsWithTransactionsOfStep(step, previousBalances) {
  let accountsWithTransactionsOfStep = store.accounts.all.map( account =>  ({
    account: account,
    transactionsOfStep: store.transactions.all.filter( transaction =>
      transaction._accountId === account.id && transaction.testDate(step.moment.clone(), step.periodType)
    ),
    previousBalance: previousBalances ?
      previousBalances.find( o => o.account == account).previousBalance
      : account.balance
  }));
  accountsWithTransactionsOfStep = accountsWithTransactionsOfStep.map( o => ({ ...o, balanceOfStep: o.transactionsOfStep.reduce(fnReduceBalanceOfStep, o.previousBalance ) }))
  // Sum column
  if (accountsWithTransactionsOfStep.length > 1) {
    accountsWithTransactionsOfStep.push({
      account: {},
      balanceOfStep: accountsWithTransactionsOfStep.reduce( (prev, curr) => prev.balanceOfStep + curr.balanceOfStep)
    })
  }
  return accountsWithTransactionsOfStep;
}

function extractPreviousBalances(accountsWithTransactionsOfStep) {
  return accountsWithTransactionsOfStep.map( o => ({ account: o.account, previousBalance: o.balanceOfStep }))
}

function generateSteps(numberPeriodSteps, periodType, currentDate = moment()) {
    const steps = [];
    for (let i = 0; i < numberPeriodSteps; i++) {
        const step = { moment: moment(currentDate).add(i, periodType), periodType: periodType }
        let previousBalances;
        if (i > 0) {
          previousBalances = extractPreviousBalances(steps[i-1].accountsWithTransactionsOfStep);
        }
        step.accountsWithTransactionsOfStep = createAccountsWithTransactionsOfStep(step, previousBalances);
        steps.push(step)
    }
    return steps;
}

class PeriodStore {
  @observable periodType = 'days';

  @observable endDate = moment().add(5, 'days');

  @computed get periodLength() {
    const today = moment();
    if (this.periodType === 'days') {
      return moment(this.endDate).diff(today, this.periodType) + 1;
    }
    if (this.periodType === 'months') {
      return calculateMonthDiff(today, this.endDate) + 1;
    }
  }

  @computed get selectedSteps() {
    return generateSteps(this.periodLength, this.periodType);
  }

  @action updateEndDate( endDate ) {
    this.endDate = endDate;
  }

  @action changePeriodType( periodType ) {
    this.periodType = periodType;
  }
}

export default new PeriodStore();
