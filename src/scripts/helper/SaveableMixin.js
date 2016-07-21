import { autorun } from 'mobx';
import { loadFromStorage, saveToStorage } from './storageHelper';

import isMobxArray from '../helper/isMobxArray';


export default function SaveableMixinFactory(baseClass = class {}) {
  return class SaveableClass extends baseClass {
    keysToExport = []

    exportData() {
      const data = Object.create(null);
      this.keysToExport.forEach( key => {
        const value = this[key];
        if (value && typeof value.exportData === 'function') {
          data[key] = value.exportData();
        } else if (isMobxArray(value)) {
          data[key] = value.map( e => e && typeof e.exportData === 'function' ? e.exportData() : e);
        } else {
          data[key] = value;
        }
      });
      return data;
    }
    
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
}