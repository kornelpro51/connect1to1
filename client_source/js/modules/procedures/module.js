define(['angular', 'angular-resource', 'angular-ui-router', 'angular-ui-select2'], function (ng) {
  'use strict';
  return ng.module('app.procedures', ['ngResource', 'ui.router', 'ui.select2'])
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('procedures', {
          url: '/procedures',
          views: {
            '@' : {
              controller: 'ProceduresController',
              templateUrl: 'js/modules/procedures/list.html'
            }
          }
        })
        .state('procedures.create', {
          url: '/create',
          views: {
            '@' : {
              controller: 'ProceduresController',
              templateUrl: 'js/modules/procedures/create.html'
            }
          }
        })
        .state('procedures.details', {
          url: '/:procedureId',
          views: {
            '@' : {
              controller: 'ProceduresController',
              templateUrl: 'js/modules/procedures/view.html'
            }
          }
        })
        .state('procedures.details.edit', {
          url: '/edit',
          views: {
            '@' : {
              controller: 'ProceduresController',
              templateUrl: 'js/modules/procedures/edit.html'
            }
          }
        });

    }]);
});
