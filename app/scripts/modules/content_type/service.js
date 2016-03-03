'use strict';

angular
	.module('admin.webclient.content_type')
	.service('ContentTypeService',['$q','$window', function($q, $window){

    var STORAGE_KEY = 'content_types';

    function getStorage(){
      return JSON.parse($window.localStorage.getItem(STORAGE_KEY)) || {};
    }

    function setStorage(key, data){
      var existing = getStorage();
      if(data == null){
        delete existing[key];
      } else {
        existing[key] = data;
      }
      $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }

    this.findByKey = function(key){
      return $q(function(resolve, reject){
        resolve(getStorage()[key]);
      });
    };

    this.list = function(){
      return $q(function(resolve, reject){
        var items = getStorage();
        var resp = Object.keys(items).map(function(k){
          return items[k];
        });
        resolve(resp);
      });
    };

    this.save = function(item){
      return $q(function(resolve, reject){
        setStorage(item.key, item);
        resolve(item);
      });
    };

    this.update = function(item){
      return $q(function(resolve, reject){
        var existing = getStorage()[item.key];
        delete item.key;
        Object.keys(item).forEach(function(k){
          existing[k] = item[k];
        });
        setStorage(existing.key, existing);
        resolve(existing);
      });
    };

    this.delete = function(key){
      return $q(function(resolve, reject){
        setStorage(key, null);
        resolve();
      });
    };

  }]);
