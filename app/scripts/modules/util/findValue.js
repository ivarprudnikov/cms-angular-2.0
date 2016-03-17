import {Pipe} from 'angular2/core';

@Pipe({ name: 'findValue' })
export class FindValuePipe {
  transform(...args){
    var val = args[0];
    var key = args[1];

    if('object' === typeof val && val && 'string' === typeof key){
      return val[key];
    } else if(Array.isArray(val)){
      return val.filter(function(v){ return v === key; });
    }
    return val;
  }
}
