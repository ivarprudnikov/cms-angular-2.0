'use strict';

angular
  .module('admin.webclient.content_model')
  .controller('ContentModelEditController', ['$scope', '$state', '$stateParams', 'CONTENT_TYPE', 'ModalFactoryForDelete', 'Loader', 'ContentModelService',
    function($scope, $state, $stateParams, CONTENT_TYPE, ModalFactoryForDelete, Loader, ContentModelService){

      if(!$stateParams.id){
        return;
      }

      $scope.contentType = CONTENT_TYPE;
      $scope.contentTypeKey = $stateParams.key;

      if(angular.isObject(CONTENT_TYPE.schema)){
        $scope.schema = angular.copy(CONTENT_TYPE.schema);
        $scope.schema.properties = $scope.schema.properties || {};
        $scope.schema.required = $scope.schema.required || [];
      } else {
        $scope.schema = {
          type: 'object',
          properties: {},
          required: []
        };
      }

      $scope.formDefinition = [
        "*",
        {
          type: "submit",
          title: "Save"
        }
      ];

      var loader = new Loader($scope, 'loadingMessage');

      loader.start();
      ContentModelService.get($stateParams.key, $stateParams.id)
        .then(function(item){
          $scope.existingItemModel = item;
        })
        .finally(function(){
          loader.stop();
        });

      $scope.delete = function(){
        if($scope.existingItemModel){
          ModalFactoryForDelete.open()
            .then(function() {
              return ContentModelService.delete($stateParams.key, $stateParams.id);
            })
            .then(function(){
              $state.go('^.list');
            });
        }
      };

      $scope.onSubmit = function(form) {

        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid && !loader.inProgress()) {

          loader.start();

          ContentModelService.update($stateParams.key, $stateParams.id, $scope.existingItemModel)
            .then(function(){
              $state.go('^.show', {id: $stateParams.id, key: $stateParams.key});
            })
            .finally(function(){
              loader.stop();
            });
        }

      };

    }]);
