import { observable, action } from 'mobx';

export default class CollectionClass {
  model = undefined
  @observable all = [];

  @action add(newDataset) {
    const newModel = this.model ? new this.model(newDataset) : newDataset;
    if (!newModel.id) {
      throw new Error('Tried to add a model to a collection without an ID');
    }
    this.all.push(newModel);
    return this;
  }

  @action delete(...args) {
    args.forEach(idToDelete => {
      const index = this.all.findIndex(model => model.id === idToDelete);
      if (index >= 0) {
        this.all.splice(index, 1);
      } 
    })
    return this;
  }
}