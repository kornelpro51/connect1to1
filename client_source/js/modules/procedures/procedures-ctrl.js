define([
  'angular',
  'underscore',
  './module'
], function (angular, _, module) {
  'use strict';

  module.controller('ProceduresController', [
    '$scope',
    '$stateParams',
    '$location',
    'Procedures',
    'Attributes',
    function ($scope, $stateParams, $location, Procedures, Attributes) {

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
          callback($scope.procedure.attributes);
        }
      };

      $scope.$watch('procedure', function (procedure) {
        if (procedure && procedure.attributes) {
          angular.element('#attributes').select2('val', procedure.attributes);
        }
      });

      // load attributes list
      Attributes.query(function (attributes) {
        angular.forEach(attributes, function (attribute) {
          $scope.allUsers.push(attribute);
        });
      });

      $scope.create = function () {
        var procedure = new Procedures({
          name: this.name,
          attributes: _($scope.attributes).map(function (item) { return item._id; })
        });

        procedure.$save(function (response) {
          $location.path('procedures/' + response._id);
        }, function (response) {
          $scope.errors = response.errors;
        });
      };

      $scope.remove = function (procedure) {
        procedure.$remove();

        for (var i in $scope.procedures) {
          if ($scope.procedures[i] == procedure) {
            $scope.procedures.splice(i, 1);
          }
        }
      };

      $scope.update = function () {
        var procedure = $scope.procedure;
        if (!procedure.updated) {
          procedure.updated = [];
        }
        procedure.updated.push(new Date().getTime());

        procedure.$update(function () {
          $location.path('procedures/' + procedure._id);
        });
      };

      $scope.find = function (query) {
        Procedures.query(query, function (procedures) {
          $scope.procedures = procedures;
        });
      };

      $scope.findOne = function () {
        Procedures.get(
          { procedureId: $stateParams.procedureId },
          function (procedure) {
            $scope.procedure = procedure;
          }
        );
      };

    }]);
});
