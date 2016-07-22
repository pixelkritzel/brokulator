import { observable, computed, action } from 'mobx';
import moment from 'moment';

import store from './store';

function fnReduceBalanceOfDay(previousBalance, transaction) {
  return transaction.apply(previousBalance)
}

function createAccountsWithTransactionsOfDay(momentDay, previousBalances) {
  const accountsWithTransactionsOfDay = store.accounts.all.map( account =>  ({
    account: account,
    transactionsOfDay: store.transactions.all.filter( transaction => transaction.testDate(momentDay) && transaction._accountId === account.id ),
    previousBalance: previousBalances ? previousBalances.find( o => o.account == account).previousBalance : account.balance
  }));
  return accountsWithTransactionsOfDay.map( o => ({ ...o, balanceOfDay: o.transactionsOfDay.reduce(fnReduceBalanceOfDay, o.previousBalance ) }))
}

function extractPreviousBalances(accountsWithTransactionsOfDay) {
  return accountsWithTransactionsOfDay.map( o => ({ account: o.account, previousBalance: o.balanceOfDay }))
}

function generateDays(numberOfDays, currentDate = moment()) {
    const days = [];
    for (let i = 0; i < numberOfDays; i++) {
        const day = { moment: moment(currentDate).add(i, 'days') }
        let previousBalances;
        if (i > 0) {
          previousBalances = extractPreviousBalances(days[i-1].accountsWithTransactionsOfDay);
        }
        day.accountsWithTransactionsOfDay = createAccountsWithTransactionsOfDay(day.moment.clone(), previousBalances);
        days.push(day)
    }
    return days;
}

class DaysStore {

  @observable period = 5;

  @computed get selected() {
    return generateDays(this.period);
  }

  @action updatePeriod( days ) {
    this.period = days;
  }
}

export default new DaysStore();
