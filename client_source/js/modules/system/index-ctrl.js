define(['./module'], function (systemModule) {
  'use strict';

  systemModule.controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
  }]);
});
