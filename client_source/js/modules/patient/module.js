define(['angular', 'angular-resource', 'angular-ui-router', 'angular-ui-calendar', 'angular-ui-validate'], function (ng) {
  'use strict';
  return ng.module('app.patient', ['ngResource', 'ui.bootstrap', 'ui.bootstrap.tpls','ui.router', 'ui.calendar', 'ui.validate'])
    .config(['$stateProvider', function ($stateProvider) {

      var partial = function (name) {
          return 'js/modules/patient/' + name + '.html';
        };

      $stateProvider
        .state('patients', {
          url: '/patients',
          views: {
            '@' : {
              controller: 'PatientController',
              templateUrl: partial('list')
            }
          }
        })
        .state('patients.details', {
          url: '/:patientId',
          views: {
            '@' : {
              controller: 'PatientController',
              templateUrl: partial('view')
            }
          }
        })
        .state('patients.details.edit', {
          url: '/edit',
          views: {
            '@' : {
              controller: 'PatientController',
              templateUrl: partial('edit')
            }
          }
        })
        .state('patients.widget', {
          url: '/create/widget',
          views: {
            '@' : {
              controller: 'PatientWidgetController',
              templateUrl: partial('widget')
            }
          }
        });

    }]);
});
