define(['angular', 'angular-resource', 'angular-ui-router', 'angular-ui-select2'], function (ng) {
  'use strict';
  return ng.module('app.conditions', ['ngResource', 'ui.router', 'ui.select2'])
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('conditions', {
          url: '/conditions',
          views: {
            '@' : {
              controller: 'ConditionsController',
              templateUrl: 'js/modules/conditions/list.html'
            }
          }
        })
        .state('conditions.create', {
          url: '/create',
          views: {
            '@' : {
              controller: 'ConditionsController',
              templateUrl: 'js/modules/conditions/create.html'
            }
          }
        })
        .state('conditions.details', {
          url: '/:conditionId',
          views: {
            '@' : {
              controller: 'ConditionsController',
              templateUrl: 'js/modules/conditions/view.html'
            }
          }
        })
        .state('conditions.details.edit', {
          url: '/edit',
          views: {
            '@' : {
              controller: 'ConditionsController',
              templateUrl: 'js/modules/conditions/edit.html'
            }
          }
        });

    }]);
});
