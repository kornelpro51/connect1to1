/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app', './config'], function (app) {
  'use strict';

  app.config([
    '$urlRouterProvider',
    function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }
  ]);

  //Setting HTML5 Location Mode
  app.config([
    '$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix("!");
    }]);

});
