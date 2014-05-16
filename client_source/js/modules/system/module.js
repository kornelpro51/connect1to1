define(['angular', 'angular-ui-router'], function (ng) {
  'use strict';
  return ng.module('app.system', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('index', {
          url: '/',
          views: {
            '@': {
              templateUrl: 'js/modules/system/index.html'
            }
          }
        });

    }]);

});
