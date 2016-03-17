import {Pipe} from 'angular2/core';

@Pipe({ name: 'mapToIterable' })
export class MapToIterablePipe {
  transform(val){
    if('object' === typeof val && val){
      return Object.keys(val).map(function(k){
        return { key: k, value: val[k] };
      });
    }
    return [];
  }
}
