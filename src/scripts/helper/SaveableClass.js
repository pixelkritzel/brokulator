import { autorun } from 'mobx';
import { loadFromStorage, saveToStorage } from './storageHelper';

import DataExportClass from './DataExportClass';

export default class SaveableClass extends DataExportClass {
  load(callback) {
    return loadFromStorage(this.storageKey).then( data => {
      data = JSON.parse(data);
      if (callback) {
        callback(data)
      } else {
        if (data) {
          Object.keys(data).forEach( key => this[key] = data[key] );
        }
      }
    });
  }

  save() {
    const data = JSON.stringify(this.exportData());
    return saveToStorage(this.storageKey, data);
  }
}