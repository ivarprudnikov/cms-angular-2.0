'use strict';

angular
  .module('admin.webclient.content_model')
  .controller('ContentModelShowController', ['$scope', '$stateParams', 'ContentModelService', 'Loader', 'CONTENT_TYPE',
    function($scope, $stateParams, ContentModelService, Loader, CONTENT_TYPE){

      if(!$stateParams.id){
        return;
      }

      $scope.contentType = CONTENT_TYPE;
      $scope.contentTypeKey = $stateParams.key;

      var loader = new Loader($scope, 'loadingMessage');

      loader.start();
      ContentModelService.get($stateParams.key, $stateParams.id)
        .then(function(item){
          $scope.item = item;
        })
        .finally(function(){
          loader.stop();
        });

    }]);
