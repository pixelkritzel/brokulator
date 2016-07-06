import { observable, action, autorun } from 'mobx';

import SaveableClass from '../helper/SaveableClass';
import Transaction from '../models/transaction';

class TransactionStore extends SaveableClass {
  keysToExport = ['all'];
  storageKey = 'BrokulatorTransactions';

  constructor() {
    super(...arguments);
    this.load(data => {
       if(data) { this.all = data.all.map(transaction => new Transaction(transaction)); }
    });
  }

  @observable all = [];

  @action addTransaction(newTransaction) {
    const transaction = new Transaction(newTransaction);
    this.all.push(transaction);
  }


  @action delete(...args) {
    args.forEach(idToDelete => {
      const index = this.all.findIndex(transaction => transaction.id === idToDelete);
      if (index >= 0) {
        this.all.splice(index, 1);
      } 
    })
  }
}

const transactionStore = new TransactionStore();

autorun(() => transactionStore.save());

export default transactionStore;