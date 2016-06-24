import { observable, action } from 'mobx';

class AppStateStore {
  @observable route = 'calculation'

  @action navigateTo(newRoute) {
    console.log(newRoute)
    this.route = newRoute;
  }
}

export default new AppStateStore();