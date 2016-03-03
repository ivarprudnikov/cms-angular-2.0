'use strict';

angular
	.module('admin.webclient.content_model', [
    'ui.router',
		'admin.webclient.content_type',
    'admin.webclient.modals'
	])

	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
		function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
			.state('content_model', {
        abstract: true,
				url: '/content_model/:key',
				views: {
					'body@': {
						template: '<div ui-view></div>'
					}
				},
				resolve: {
					CONTENT_TYPE: ['$stateParams', 'ContentTypeService', function($stateParams, ContentTypeService){
						return ContentTypeService.findByKey($stateParams.key);
					}]
				}
			})

			.state('content_model.list', {
				url: '?max&offset',
				templateUrl: 'scripts/modules/content_model/views/list.html',
				controller: 'ContentModelListController'
			})

			.state('content_model.show', {
        url: '/show/:id',
        templateUrl: 'scripts/modules/content_model/views/show.html',
        controller: 'ContentModelShowController'
      })

			.state('content_model.create', {
				url: '/create',
				templateUrl: 'scripts/modules/content_model/views/create.html',
				controller: 'ContentModelCreateController'
			})

      .state('content_model.edit', {
        url: '/edit/:id',
        templateUrl: 'scripts/modules/content_model/views/edit.html',
        controller: 'ContentModelEditController'
      });

	}]);
