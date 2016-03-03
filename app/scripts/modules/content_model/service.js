'use strict';

angular.module('admin.webclient.content_model')
  .service('ContentModelService',['$q', '$window', function($q, $window){

    var PREFIX = 'content_model_';

    function getStorage(key){
      return JSON.parse($window.localStorage.getItem(PREFIX + key)) || {};
    }

    function setStorage(key, id, data){
      var existing = getStorage(key);
      if(data == null){
        delete existing[id];
      } else {
        existing[id] = data;
      }
      $window.localStorage.setItem(PREFIX + key, JSON.stringify(existing));
    }

    this.keyHasChildren = function(key){
      return $q(function(resolve){
        var items = getStorage(key);
        if(items && 'object' === typeof items && Object.keys(items).length){
          resolve(true);
        } else {
          resolve(false);
        }
      });
    };

    this.search = function(key, params){
      return $q(function(resolve){

        params = params || {};
        params.max = params.max || 10;
        params.offset = params.offset || 0;

        var response = {
          total: 0,
          data: []
        };

        var items = getStorage(key);
        var keys = Object.keys(items);

        response.total = keys.length;

        response.data = keys.map(function(k){
          return items[k];
        }).slice(params.offset, params.offset + params.max);

        resolve(response);
      });
    };

    this.get = function(key, id){
      return $q(function(resolve){
        var item = getStorage(key)[id];
        resolve(item);
      });
    };

    this.save = function(key, item){
      return $q(function(resolve){
        var id = (new Date()).getTime();
        item._id = id;
        setStorage(key, id, item);
        resolve(item);
      });
    };

    this.update = function(key, id, item){
      return $q(function(resolve){
        var existing = getStorage(key)[id];
        Object.keys(item).forEach(function(k){
          existing[k] = item[k];
        });
        setStorage(key, id, existing);
        resolve(existing);
      });
    };

    this.delete = function(key, id){
      return $q(function(resolve){
        setStorage(key, id, null);
        resolve();
      });
    };

  }]);
