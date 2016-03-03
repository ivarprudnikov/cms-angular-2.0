'use strict';

angular
  .module('admin.webclient.content_model')
  .controller('ContentModelListController', ['$scope', '$state', '$stateParams', 'CONTENT_TYPE', 'Loader', 'ContentModelService',
    function($scope, $state, $stateParams, CONTENT_TYPE, Loader, ContentModelService){

      var loader = new Loader($scope, 'loadingMessage');

      $scope.contentType = CONTENT_TYPE;
      $scope.contentTypeKey = $stateParams.key;

      $scope.searchOptions = $scope.searchOptions || {};
      $scope.searchOptions.max = Math.min((parseInt($stateParams.max) || 10), 10);
      $scope.searchOptions.offset = parseInt($stateParams.offset) || 0;

      $scope.pagination = {};
      $scope.pagination.page = 1;

      /**
       * Init with null results
       * helps identifying if search started already
       * @type {null}
       */
      $scope.results = null;

      /**
       * State parameters == query parameters
       * they are always watched and in case those change
       * i.e. user navigates to this state
       * then some logic defined here is executed.
       */
      $scope.$watch($stateParams, function () {
        calculateCurrentPage();
        searchForResults();
      });

      $scope.$watch('searchOptions', function (newVal,oldVal) {
        if(!angular.equals(newVal, oldVal) && angular.isDefined(oldVal)){
          refreshState();
        }
      }, true);

      /**
       * Selects searchOptions fields that are NOT null/undefined
       * @returns {*}
       */
      function selectedSearchOptions() {
        var o = {};
        angular.forEach($scope.searchOptions, function(value, key){
          /* jshint eqeqeq:false, eqnull:true */
          if (value != null) {
            o[key] = value;
          }
        });
        return o;
      }

      /**
       * Api error handling delegates to utility
       * which will show the message in the view
       * @param httpResponse
       */
      function errorHandler(httpResponse) {
        loader.error(httpResponse);
      }

      function refreshState(){
        $state.go($state.$current.name, $scope.searchOptions, {
          reload: false,
          notify: false,
          inherit: true,
          location: true
        });
      }

      function searchForResults(){
        loader.start();
        ContentModelService.search($scope.contentTypeKey, selectedSearchOptions())
          .then(function(resp){
            $scope.results = resp;
            calculateCurrentPage();
          })
          .catch(errorHandler)
          .finally(function(){
            loader.stop();
          });
      }

      // PAGINATION
      /////////////////////

      /**
       * Watch page change,
       * Used in pagination
       */
      $scope.$watch('pagination.page', function (oldValue,newValue) {
        if(oldValue !== newValue){
          calculateCurrentPagination();
          searchForResults();
          $('html,body').animate({scrollTop: 0}, 100);
        }
      });

      function calculateCurrentPage(){
        if(!$scope.results || !$scope.results.total || $scope.searchOptions.offset === 0){
          $scope.pagination.page = 1;
        } else {
          $scope.pagination.page = Math.floor($scope.searchOptions.offset / $scope.searchOptions.max) + 1;
        }
      }

      function calculateCurrentPagination(){
        $scope.searchOptions.offset = $scope.searchOptions.max * ($scope.pagination.page - 1);
      }

    }]);
