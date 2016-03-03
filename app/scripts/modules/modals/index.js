'use strict';

angular.module('admin.webclient.modals',['ui.bootstrap'])
  .factory('ModalFactoryForDelete', ['$modal', function($modal){

    var template = '' +
      '<div class="modal-header">' +
      '  <button type="button" class="close" aria-label="Close" ng-click="cancel()">' +
      '    <span aria-hidden="true">&times;</span>' +
      '  </button>' +
      '  <h4 class="modal-title">Delete</h4>' +
      '</div>' +
      '<div class="modal-body">' +
      '  <p>Are you sure you want to delete it?</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '  <button class="btn btn-danger" ng-click="ok()">Yes, delete!</button>' +
      '  <button class="btn btn-default" ng-click="cancel()">Cancel</button>' +
      '</div>' +
      '';

    /**
     * returns modal {promise}
     */
    function open(){
      var modalInstance = $modal.open({
        animation: true,
        template: template,
        controller: ['$scope', '$modalInstance', function($scope, $modalInstance){
          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss();
          };
        }],
        size: 'sm'
      });

      return modalInstance.result;
    }

    return {
      open: open
    };

  }])
  .factory('ModalFactoryForMessage', ['$modal', function($modal){

    var template = '' +
      '<div class="modal-header" ng-if="title">' +
      '  <button type="button" class="close" aria-label="Close" ng-click="close()">' +
      '    <span aria-hidden="true">&times;</span>' +
      '  </button>' +
      '  <h4 class="modal-title">{{title}}</h4>' +
      '</div>' +
      '<div class="modal-body" ng-if="message">' +
      '  <p>{{message}}</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '  <button class="btn btn-default" ng-click="close()">Close</button>' +
      '</div>' +
      '';

    /**
     * returns modal {promise}
     */
    function open(options){
      options = options || {};
      var modalInstance = $modal.open({
        animation: true,
        template: template,
        controller: ['$scope', '$modalInstance', function($scope, $modalInstance){
          $scope.title = options.title;
          $scope.message = options.message;
          $scope.close = function () {
            $modalInstance.close();
          };
        }],
        size: 'sm'
      });

      return modalInstance.result;
    }

    return {
      open: open
    };

  }])
  .factory('ModalFactoryForConfirmation', ['$modal', function($modal){

    var template = '' +
      '<div class="modal-header">' +
      '  <button type="button" class="close" aria-label="Close" ng-click="cancel()">' +
      '    <span aria-hidden="true">&times;</span>' +
      '  </button>' +
      '  <h4 class="modal-title">{{ title || \'Confirm action\' }}</h4>' +
      '</div>' +
      '<div class="modal-body">' +
      '  <p>{{ message || \'Are you sure you want to do it?\' }}</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '  <button class="btn btn-default btn-sm" ng-click="cancel()">Cancel</button>' +
      '  <button class="btn btn-primary btn-sm" ng-click="ok()">Yes, proceed!</button>' +
      '</div>' +
      '';

    /**
     * returns modal {promise}
     */
    function open(options){
      options = options || {};
      var modalInstance = $modal.open({
        animation: true,
        template: template,
        controller: ['$scope', '$modalInstance', function($scope, $modalInstance){
          $scope.title = options.title;
          $scope.message = options.message;

          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss();
          };
        }],
        size: 'sm'
      });

      return modalInstance.result;
    }

    return {
      open: open
    };

  }]);
