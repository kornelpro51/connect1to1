define(['angular', 'angular-resource', 'angular-ui-router', '../divisions/index'], function (ng) {
  'use strict';

  return ng.module('app.instances', ['ngResource', 'ui.router', 'app.divisions'])
    .config(['$stateProvider', function ($stateProvider) {

      /**
       * Returns url path to partial
       * @param {string} name - partial filename
       * @returns {string}
       */
      var partial = function (name) {
          return 'js/modules/instances/' + name + '.html';
        },
        controller = 'InstancesController',
        rootState = 'organizations.details.divisions.details.';

      $stateProvider
        .state(rootState + 'instances', {
          url: '/instances',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('list')
            }
          }
        })
        .state(rootState + 'instances.details', {
          url: '/:instanceId',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('view')
            }
          }
        })
        .state(rootState + 'instances.details.edit', {
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
