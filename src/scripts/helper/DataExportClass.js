export default class DataExportClass {
  keysToExport = []

  exportData() {
    console.log('keysToExport', this.keysToExport);
    const data = Object.create(null);
    this.keysToExport.forEach( key => {
      const value = this[key];
      console.log('serialized value',value)
      if (DataExportClass.isPrototypeOf(this[key].constructor) ) {
        data[key] = this[key].exportData();
      } else if (typeof this[key].map === 'function' ) {
        console.log('Array')
        data[key] = this[key].map( e => DataExportClass.isPrototypeOf(e.constructor) ? e.exportData() : e);
      } else {
        data[key] = this[key];
      }
    });
    return data;
  }
}