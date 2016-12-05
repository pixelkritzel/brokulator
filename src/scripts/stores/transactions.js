import { observable, action, autorun, computed } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';
import CollectionClass from '../helper/CollectionClass';

import store from './store';
import Transaction from '../models/transaction';


class TransactionStore extends SaveableMixinFactory(CollectionClass) {
  keysToExport = ['all'];
  storageKey = 'BrokulatorTransactions';
  @observable isLoaded = false;
  model = Transaction;

  constructor() {
    super(...arguments);
    this.load(data => {
       if(data) { 
         data.all.forEach( transaction => this.add(transaction) );
         this.isLoaded = true;
        }
    });
  }

  @computed get alerts() {
    const alerts = [];
    if (this.all.length === 0) {
      alerts.push('No transactions!');
    }
    return alerts;
  }
}

const transactionStore = new TransactionStore();

autorun(() => transactionStore.save());

export default transactionStore;