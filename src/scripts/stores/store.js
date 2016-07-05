import { observable, action, autorun } from 'mobx';

import SaveableClass from '../helper/SaveableClass';

import days from './days';
import appState from './appState';
import transactions from './transactions';

export class Store extends SaveableClass {
  @observable days = days
  @observable appState = appState
  @observable transactions = transactions
}

const store = new Store(); 

export default store;