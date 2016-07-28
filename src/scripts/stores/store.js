/* globals window */

import { observable, action, autorun, computed } from 'mobx';

import SaveableMixinFactory from '../helper/SaveableMixin';

import period from './periodStore';
import appState from './appState';
import transactions from './transactions';
import accounts from './accounts';

export class Store extends SaveableMixinFactory() {
  @observable period = period
  @observable appState = appState
  @observable transactions = transactions
  @observable accounts = accounts
  @computed get isLoaded() { return this.accounts.isLoaded && this.transactions.isLoaded; }
}

const store = new Store();

window.store = store; 

export default store;