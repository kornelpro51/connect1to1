define(['./module'], function (module) {
  'use strict';

  module.controller('DivisionsController', [
    '$scope',
    '$stateParams',
    '$location',
    'Organizations',
    function ($scope, $stateParams, $location, Organizations) {
      // default division object to add new ones
      var defaultDivision = {
        name: '',
        address: '',
        instances: []
      };

      $scope.update = function () {
        var organization = $scope.organization;
        if (!organization.updated) {
          organization.updated = [];
        }
        organization.updated.push(new Date().getTime());

        organization.$update(function () {
          $location.path('organizations/' + organization._id + '/divisions');
        });
      };

      $scope.findOne = function () {
        Organizations.get(
          { organizationId: $stateParams.organizationId },
          function (organization) {
            $scope.organization = organization;
            $scope.division = organization.divisions[$stateParams.divisionId];
            $scope.divisionId = $stateParams.divisionId;
          }
        );
      };

      $scope.isAddDivisionFormVisible = false;

      /**
       * Adds new division to stack
       * @param $event
       */
      $scope.toggleAddDivisionForm = function ($event) {
        if ($event) {
          $event.preventDefault();
        }
        $scope.isAddDivisionFormVisible = !$scope.isAddDivisionFormVisible;
      };

      $scope.addDivision = function () {
        $scope.organization.divisions.push(_($scope.newDivision).clone());
        angular.extend($scope.newDivision, defaultDivision);
        $scope.update();
      };

    }]);
});
