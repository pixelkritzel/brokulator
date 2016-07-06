import { observable, action, autorun } from 'mobx';

import SaveableClass from '../helper/SaveableClass';

class AppStateStore extends SaveableClass {
  keysToExport = ['route']
  storageKey = 'BrokulatorAppState';

  constructor() {
    super(...arguments);
    this.load();
  }

  @observable route = 'calculation'
  @observable transactions = { showAddTransactionForm: false }

  @action navigateTo(newRoute) {
    this.route = newRoute;
  }
}

const appStateStore = new AppStateStore();

autorun(() => appStateStore.save());

export default appStateStore;