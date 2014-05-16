define(['angular', 'angular-resource', 'angular-ui-router'], function (ng) {
  'use strict';
  return ng.module('app.attributes', ['ngResource', 'ui.router'])
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('attributes', {
          url: '/attributes',
          views: {
            '@' : {
              controller: 'AttributesController',
              templateUrl: 'js/modules/attributes/list.html'
            }
          }
        })
        .state('attributes.create', {
          url: '/create',
          views: {
            '@' : {
              controller: 'AttributesController',
              templateUrl: 'js/modules/attributes/create.html'
            }
          }
        })
        .state('attributes.details', {
          url: '/:attributeId',
          views: {
            '@' : {
              controller: 'AttributesController',
              templateUrl: 'js/modules/attributes/view.html'
            }
          }
        })
        .state('attributes.details.edit', {
          url: '/edit',
          views: {
            '@' : {
              controller: 'AttributesController',
              templateUrl: 'js/modules/attributes/edit.html'
            }
          }
        });

    }]);
});
