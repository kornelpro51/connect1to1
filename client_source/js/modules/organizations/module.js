define(['angular', 'angular-resource', 'angular-ui-router'], function (ng) {
  'use strict';

  return ng.module('app.organizations', ['ngResource', 'ui.router'])
    .config(['$stateProvider', function ($stateProvider) {

      /**
       * Returns url path to partial
       * @param {string} name - partial filename
       * @returns {string}
       */
      var partial = function (name) {
          return 'js/modules/organizations/' + name + '.html';
        },
        controller = 'OrganizationsController';

      $stateProvider
        .state('organizations', {
          url: '/organizations',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('list')
            }
          }
        })
        .state('organizations.create', {
          url: '/create',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('create')
            }
          }
        })
        .state('organizations.details', {
          url: '/:organizationId',
          views: {
            '@' : {
              controller: controller,
              templateUrl: partial('view')
            }
          }
        })
        .state('organizations.details.edit', {
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
