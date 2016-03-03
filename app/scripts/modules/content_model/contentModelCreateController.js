'use strict';

angular
  .module('admin.webclient.content_model')
  .controller('ContentModelCreateController', ['$scope', '$state', 'CONTENT_TYPE', 'Loader', 'ContentModelService',
    function($scope, $state, CONTENT_TYPE, Loader, ContentModelService){

    var loader = new Loader($scope, 'loadingMessage');

    $scope.contentType = CONTENT_TYPE;

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

    $scope.newItemModel = {};

    /**
     * Submit form data.
     * Check if item source needs to be aggregated
     * before saving to Firebase.
     */
    $scope.onSubmit = function(form){

      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      if (form.$valid && !loader.inProgress()) {
        loader.start();
        ContentModelService.save($scope.contentType.key, $scope.newItemModel)
          .then(function(){
            $scope.newItemModel = {};
            $state.go('^.list');
          })
          .finally(function(){
            loader.stop();
          });
      }
    };

  }]);
