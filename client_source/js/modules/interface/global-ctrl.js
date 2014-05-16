define(['./module'], function (module) {
  "use strict";

  module.controller('GlobalController', [
    '$scope',
    'Global',
    function ($scope, Global) {
      $scope.global = Global;
      $scope.brandLink = Global.authenticated ? '#!/' : '/';

      /**
       * Assigns a class to form field based on its validation status
       *
       * @example
       * <form name="mainForm">
       *   <input name="email" data-ng-class="formFieldValidationClass(mainForm.email)">
       * </form>
       *
       * @param {object} field - form field object
       * @returns {object|string}
       */
      $scope.formFieldValidationClass = function (field) {
        if (!field) {
          return '';
        }
        return {
          'has-error': field.$dirty && field.$invalid
        };
      };
    }]);
});
