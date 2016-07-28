import { observable, computed, action } from 'mobx';
import moment from 'moment';

import store from './store';

function fnReduceBalanceOfStep(previousBalance, transaction) {
  return transaction.apply(previousBalance)
}

function createAccountsWithTransactionsOfStep(momentDay, previousBalances) {
  let accountsWithTransactionsOfStep = store.accounts.all.map( account =>  ({
    account: account,
    transactionsOfStep: store.transactions.all.filter( transaction =>
      transaction.testDate(momentDay) && transaction._accountId === account.id
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
      transactionsOfStep: store.transactions.all.filter( transaction => transaction.testDate(momentDay) ),
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
        const step = { moment: moment(currentDate).add(i, periodType) }
        let previousBalances;
        if (i > 0) {
          previousBalances = extractPreviousBalances(steps[i-1].accountsWithTransactionsOfStep);
        }
        step.accountsWithTransactionsOfStep = createAccountsWithTransactionsOfStep(step.moment.clone(), previousBalances);
        steps.push(step)
    }
    return steps;
}

class PeriodStore {
  @observable periodType = 'days';

  @observable endDate = moment().add(5, 'days');

  @computed get periodLength() {
    const today = moment();
    return moment(this.endDate).diff(today, 'days') + 2;
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
