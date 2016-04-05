import {Pipe} from 'angular2/core';

@Pipe({ name: 'collectionSize' })
export class CollectionSizePipe {
  transform(val){
    if('object' === typeof val && val){
      return Object.keys(val).length;
    } else if (Array.isArray(val)) {
      return val.length;
    }
    return 0;
  }
}
