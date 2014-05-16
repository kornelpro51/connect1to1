define(['./module'], function (module) {
  'use strict';

  module.directive('formError', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        errors: '='
      },
      link: function($scope, $element, $attributes) {
        $scope.$watch('errors', function() {
          if (!$scope.errors) return;
          $scope.error = $scope.errors[$attributes.fieldName];
        }, true);
      },
      template: '<span data-ng-show="error" class="help-block text-danger">{{ error.type }}</span>'
    };
  });

});
