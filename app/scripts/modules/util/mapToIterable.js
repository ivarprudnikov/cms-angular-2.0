'use strict';

function MapToIterablePipe(){
  this.transform = function(val){
    if('object' === typeof val && val){
      return Object.keys(val).map(function(k){
        return { key: k, value: val[k] };
      });
    }
    return val;
  };
}

MapToIterablePipe.annotations = [
  new ng.core.Pipe({
    name: 'mapToIterable'
  })
];

window.app = window.app || {};
window.app.MapToIterablePipe = MapToIterablePipe;
