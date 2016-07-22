import { observable, action, autorun, computed } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';

import days from './days';
import appState from './appState';
import transactions from './transactions';
import accounts from './accounts';

export class Store extends SaveableMixinFactory() {
  @observable days = days
  @observable appState = appState
  @observable transactions = transactions
  @observable accounts = accounts
  @computed get isLoaded() { return this.accounts.isLoaded && this.transactions.isLoaded; }
}

const store = new Store(); 

export default store;