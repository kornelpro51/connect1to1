define([
  'angular',
  'underscore',
  './module'
], function (angular, _, module) {
  'use strict';

  module.controller('ConditionsController', [
    '$scope',
    '$stateParams',
    '$location',
    'Conditions',
    'Attributes',
    function ($scope, $stateParams, $location, Conditions, Attributes) {

      $scope.name = '';
      $scope.attributes = [];
      $scope.allUsers = [];

      $scope.attributesSelect2Options = {
        id: function (item) { return item._id; },
        data: {
          results: $scope.allUsers,
          text: 'name'
        },
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; },
        initSelection: function (element, callback) {
          callback($scope.condition.attributes);
        }
      };

      $scope.$watch('condition', function (condition) {
        if (condition && condition.attributes) {
          angular.element('#attributes').select2('val', condition.attributes);
        }
      });

      // load attributes list
      Attributes.query(function (attributes) {
        angular.forEach(attributes, function (attribute) {
          $scope.allUsers.push(attribute);
        });
      });

      $scope.create = function () {
        var condition = new Conditions({
          name: $scope.name,
          attributes: _($scope.attributes).map(function (item) { return item._id; })
        });

        condition.$save(function (response) {
          $location.path('conditions/' + response._id);
        }, function (response) {
          $scope.errors = response.errors;
        });
      };

      $scope.remove = function (condition) {
        condition.$remove();

        for (var i in $scope.conditions) {
          if ($scope.conditions[i] == condition) {
            $scope.conditions.splice(i, 1);
          }
        }
      };

      $scope.update = function () {
        var condition = $scope.condition;
        if (!condition.updated) {
          condition.updated = [];
        }
        condition.updated.push(new Date().getTime());

        condition.$update(function () {
          $location.path('conditions/' + condition._id);
        });
      };

      $scope.find = function (query) {
        Conditions.query(query, function (conditions) {
          $scope.conditions = conditions;
        });
      };

      $scope.findOne = function () {
        Conditions.get(
          { conditionId: $stateParams.conditionId },
          function (condition) {
            $scope.condition = condition;
          }
        );
      };

    }]);
});
