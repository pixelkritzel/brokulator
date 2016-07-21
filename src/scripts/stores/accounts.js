import { observable, action, autorun } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';
import CollectionClass from '../helper/CollectionClass';
import Account from '../models/account';

class Accounts extends SaveableMixinFactory(CollectionClass) {
  keysToExport = ['all'];
  storageKey = 'BrokulatorAccounts';
  model = Account;

  constructor() {
    super(...arguments);
    this.load(data => {
       if(data) { data.all.forEach( account => this.add(account)) }
    });
  }

  @observable all = [];
}

const accountStore = new Accounts();

autorun(() => accountStore.save());

export default accountStore;