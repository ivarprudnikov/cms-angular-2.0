'use strict';

function FindValuePipe(){
  this.transform = function(){

    var val = arguments[0];
    var key = arguments[1];

    if('object' === typeof val && val && 'string' === typeof key){
      return val[key];
    } else if(Array.isArray(val)){
      return val.filter(function(v){ return v === key; });
    }
    return val;
  };
}

FindValuePipe.annotations = [
  new ng.core.Pipe({
    name: 'findValue'
  })
];

window.app = window.app || {};
window.app.FindValuePipe = FindValuePipe;
