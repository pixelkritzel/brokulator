import { observable, action, autorun, computed } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';
import CollectionClass from '../helper/CollectionClass';
import Account from '../models/account';

class Accounts extends SaveableMixinFactory(CollectionClass) {
  keysToExport = ['all'];
  storageKey = 'BrokulatorAccounts';
  @observable isLoaded = false;
  model = Account;

  constructor() {
    super(...arguments);
    this.load(data => {
       if(data) { data.all.forEach( account => this.add(account)) }
       this.isLoaded = true; 
    });
  }

  @observable all = [];

  @computed get alerts() {
    const alerts = [];
    if (this.all.length === 0) {
      alerts.push('No accounts!');
    }
    return alerts;
  }
}

const accountStore = new Accounts();

autorun(() => accountStore.save());

export default accountStore;