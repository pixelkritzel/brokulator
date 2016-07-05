export default class DataExportClass {
  keysToExport = []

  exportData() {
    const data = Object.create(null);
    this.keysToExport.forEach( key => {
      const value = this[key];
      console.log('serialized value',value)
      if (DataExportClass.isPrototypeOf(value.constructor) ) {
        data[key] = value.exportData();
      } else if (typeof value.map === 'function' ) {
        console.log('Array')
        data[key] = value.map( e => DataExportClass.isPrototypeOf(e.constructor) ? e.exportData() : e);
      } else {
        data[key] = value;
      }
    });
    return data;
  }
}