define([
  'angular',
  'underscore',
  './module'
], function (angular, _, module) {
  'use strict';

  module.controller('InstancesController', [
    '$scope',
    '$stateParams',
    '$location',
    'Organizations',
    'Conditions',
    'Procedures',
    'Users',
    function ($scope, $stateParams, $location, Organizations, Conditions, Procedures, Users) {
      // default division object to add new ones
      var defaultInstance = {
        address: '',
        conditions: [],
        name: '',
        primaryUser: '',
        procedures: [],
        tagline: '',
        urlCode: '',
        users: [],
        welcomeEmailText: ''
      };

      // set up procedures and conditions select2 widgets
      $scope.conditions = Conditions.query({});
      $scope.procedures = Procedures.query({});
      $scope.allUsers = Users.query({});

      $scope.conditionsSelect2Options = {
        id: function (item) { return item._id; },
        data: {
          results: $scope.conditions,
          text: 'name'
        },
        multiple: true,
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; },
        initSelection: function (element, callback) {
          callback($scope.instance.conditions);
        }
      };

      $scope.proceduresSelect2Options = {
        id: function (item) { return item._id; },
        data: {
          results: $scope.procedures,
          text: 'name'
        },
        multiple: true,
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; },
        initSelection: function (element, callback) {
          callback($scope.instance.procedures);
        }
      };

      $scope.primaryUserSelect2Options = {
        id: function (item) { return item._id; },
        data: function () { return { results: $scope.instance.users || [] }; },
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; },
        initSelection: function (element, callback) {
          callback($scope.instance.primaryUser);
        }
      };

      $scope.usersSelect2Options = {
        id: function (item) { return item._id; },
        data: {
          results: $scope.allUsers,
          text: 'name'
        },
        multiple: true,
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; },
        initSelection: function (element, callback) {
          callback($scope.instance.users);
        }
      };

      $scope.$watch('instance', function (instance) {
        if (!instance) {
          return;
        }

        angular.element('#users').select2('val', instance.users);
        angular.element('#primaryUser').select2('val', instance.primaryUser);
        angular.element('#conditions').select2('val', instance.conditions);
        angular.element('#procedures').select2('val', instance.procedures);
      });

      $scope.update = function () {
        var organization = $scope.organization;
        if (!organization.updated) {
          organization.updated = [];
        }
        organization.updated.push(new Date().getTime());

        organization.$update(function () {
          $location.path('organizations/' + organization._id +
            '/divisions/' + $scope.divisionId +
            '/instances'
            );
        });
      };

      $scope.findOne = function () {
        Organizations.get(
          { organizationId: $stateParams.organizationId },
          function (organization) {
            $scope.organization = organization;
            // rehydrate division
            $scope.divisionId = $stateParams.divisionId;
            $scope.division = organization.divisions[$stateParams.divisionId];
            $scope.division.instances = $scope.division.instances || [];
            // rehydrate instance
            $scope.instanceId = $stateParams.instanceId;
            $scope.instance = $scope.division.instances[$stateParams.instanceId];
          }
        );
      };

      $scope.isAddInstanceFormVisible = false;

      /**
       * Adds new division to stack
       * @param $event
       */
      $scope.toggleAddInstanceForm = function ($event) {
        if ($event) {
          $event.preventDefault();
        }
        $scope.isAddInstanceFormVisible = !$scope.isAddInstanceFormVisible;
      };

      $scope.addInstance = function () {
        if ($scope.division.instances) {
          $scope.division.instances.push(_($scope.newInstance).clone());
        } else {
          $scope.division.instances = [_($scope.newInstance).clone()];
        }

        angular.extend($scope.newInstance, defaultInstance);
        $scope.update();
      };

      // various select2 options
      $scope.conditionsSelect2Options = {
        id: function (item) { return item._id; },
        data: {
          results: $scope.conditions,
          text: 'name'
        },
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; }
      };

      $scope.proceduresSelect2Options = {
        id: function (item) { return item._id; },
        data: {
          results: $scope.procedures,
          text: 'name'
        },
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; }
      };

    }]);
});
