import { observable, action, autorun } from 'mobx';

import SaveableClass from '../helper/SaveableClass';
import Transaction from '../models/transaction';

class TransactionStore extends SaveableClass {
  keysToExport = ['transactions'];
  storageKey = 'BrokulatorTransactions';

  constructor() {
    super(...arguments);
    this.load(data => {
       if(data) { this.transactions = data.transactions.map(transaction => new Transaction(transaction)); }
    });
  }

  @observable transactions = [];

  @action addTransaction(newTransaction) {
    const transaction = new Transaction(newTransaction);
    this.transactions.push(transaction);
  }


  @action delete(...args) {
    args.forEach(idToDelete => {
      const index = this.transactions.findIndex(transaction => transaction.id === idToDelete);
      if (index >= 0) {
        this.transactions.splice(index, 1);
      } 
    })
  }
}

const transactionStore = new TransactionStore();

autorun(() => transactionStore.save());

export default transactionStore;