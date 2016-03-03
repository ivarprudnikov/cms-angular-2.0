'use strict';

angular
  .module('admin.webclient.schema')
  .factory('SchemaFieldModalFactory',['$modal', function($modal){

    /**
     * returns modal {promise}
     */
    function open(existingData){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'scripts/modules/schema/views/schemaFieldFormModal.html',
        controller: 'SchemaFieldModalController',
        size: 'lg',
        resolve: {
          existingData: function(){
            return existingData;
          }
        }
      });

      return modalInstance.result;
    }

    return {
      open: open
    };
  }]);
