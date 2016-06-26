import { autorun } from 'mobx';
import { loadFromStorage, saveToStorage } from './storageHelper';

import DataExportClass from './DataExportClass';

export default class SaveableClass extends DataExportClass {
  load(callback) {
    console.log(`Loading data for ${this.storageKey}`)
    return loadFromStorage(this.storageKey).then( data => {
      data = JSON.parse(data);
      if (callback) {
        callback(data)
      } else {
        if (data) {
          Object.keys(data).forEach( key => this[key] = data[key] );
        }
      }
      console.log(`Loaded data for ${this.storageKey}`, data)
    });
  }

  save() {
    console.log(`Saving data for ${this.storageKey}`)
    const data = JSON.stringify(this.exportData());

    console.log(data);
    return saveToStorage(this.storageKey, data);
  }
}

console.log()