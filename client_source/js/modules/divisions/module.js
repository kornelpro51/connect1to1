define(['angular', 'angular-resource', 'angular-ui-router', '../organizations/index'], function (ng) {
  'use strict';

  return ng.module('app.divisions', ['ngResource', 'ui.router', 'app.organizations'])
    .config(['$stateProvider', function ($stateProvider) {

      /**
       * Returns url path to partial
       * @param {string} name - partial filename
       * @returns {string}
       */
      var partial = function (name) {
          return 'js/modules/divisions/' + name + '.html';
        },
        controller = 'DivisionsController';

      $stateProvider
        .state('organizations.details.divisions', {
          url: '/divisions',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('list')
            }
          }
        })
        .state('organizations.details.divisions.details', {
          url: '/:divisionId',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('view')
            }
          }
        })
        .state('organizations.details.divisions.details.edit', {
          url: '/edit',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('edit')
            }
          }
        });

    }]);
});
