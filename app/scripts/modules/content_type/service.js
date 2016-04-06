export class ContentTypeService {

  constructor() {
    this.STORAGE_KEY = 'content_types';
  }

  getStorage(){
    return JSON.parse(window.localStorage.getItem(this.STORAGE_KEY)) || {};
  }

  setStorage(key, data){
    var existing = this.getStorage();
    if(data == null){
      delete existing[key];
    } else {
      existing[key] = data;
    }
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing));
  }

  findByKey(key){
    return new Promise((resolve, reject) => {
      resolve(this.getStorage()[key])
    });
  }

  list(){
    return new Promise((resolve, reject) => {
      let items = this.getStorage();
      let resp = Object.keys(items).map(k => items[k]);
      resolve(resp);
    });
  }

  save(item){
    return new Promise((resolve, reject) => {
      this.setStorage(item.key, item);
      resolve(item);
    });
  }

  update(item){
    return new Promise((resolve, reject) => {
      var existing = this.getStorage()[item.key];
      delete item.key;
      Object.keys(item).forEach(k => {
        existing[k] = item[k];
      });
      this.setStorage(existing.key, existing);
      resolve(existing);
    });
  }

  delete(key){
    return new Promise((resolve, reject) => {
      this.setStorage(key, null);
      resolve();
    });
  }
}
