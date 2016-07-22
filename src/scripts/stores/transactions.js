import { observable, action, autorun } from 'mobx';

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
}

const transactionStore = new TransactionStore();

autorun(() => transactionStore.save());

export default transactionStore;