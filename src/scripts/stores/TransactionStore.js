import { observable, action, autorun } from 'mobx';

import SaveableClass from '../helper/SaveableClass';
import Transaction from '../models/transaction';

class TransactionStore extends SaveableClass {
  keysToExport = ['transactions'];
  storageKey = 'BrokulatorTransactions';

  constructor() {
    super(...arguments);
    this.load(data => {
       data && this.transactions = data.transactions.map(transaction => new Transaction(transaction))
    });
  }

  @observable transactions = [];

  @action addTransaction(newTransaction) {
    const transaction = new Transaction(newTransaction);
    this.transactions.push(transaction);
  }
}

const transactionStore = new TransactionStore();

autorun(() => transactionStore.save());

export default transactionStore;