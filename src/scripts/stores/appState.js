import { observable, action, autorun } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';

class AppStateStore extends SaveableMixinFactory() {
  keysToExport = ['route']
  storageKey = 'BrokulatorAppState';

  constructor() {
    super(...arguments);
    this.load();
  }

  @observable route = 'calculation'
  @observable transactions = { showAddTransactionForm: false }
  @observable accounts = { showAddAccountForm: false }

  @action navigateTo(newRoute) {
    this.route = newRoute;
  }
}

const appStateStore = new AppStateStore();

autorun(() => appStateStore.save());

export default appStateStore;