define([
  'angular',
  'underscore',
  './module'
], function (angular, _, module) {
  'use strict';

  module.controller('OrganizationsController', [
    '$scope',
    '$stateParams',
    '$location',
    'Organizations',
    'Users',
    function ($scope, $stateParams, $location, Organizations, Users) {

      // empty organization for create page
      $scope.organization = {
        address: '',
        divisions: [],
        name: '',
        users: [],
        primaryUser: {
          name: '',
          email: '',
          phone: ''
        }
      };

      // default division object to add new ones
      var defaultDivision = {
        name: '',
        address: ''
      };

      $scope.allUsers = Users.query();

      $scope.primaryUserSelect2Options = {
        id: function (item) { return item._id; },
        data: function () { return { results: $scope.organization.users }; },
        formatSelection: function (item) { return item.name; },
        formatResult: function (item) { return item.name; },
        initSelection: function (element, callback) {
          callback($scope.organization.primaryUser);
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
          callback($scope.organization.users);
        }
      };

      $scope.$watch('organization', function (organization) {
        if (organization.users) {
          angular.element('#users').select2('val', organization.users);
          angular.element('#primaryUser').select2('val', organization.primaryUser);
        }
      });

      $scope.create = function (organization) {
        new Organizations(organization)
          .$save(
            function (savedOrganization) {
              $location.path('organizations/' + savedOrganization._id);
            },
            function (response) {
              $scope.errors = response.data.errors;
            }
          );
      };

      $scope.remove = function (organization) {
        organization.$remove();

        for (var i in $scope.organizations) {
          if ($scope.organizations[i] === organization) {
            $scope.organizations.splice(i, 1);
          }
        }
      };

      $scope.update = function () {
        var organization = $scope.organization;
        if (!organization.updated) {
          organization.updated = [];
        }
        organization.updated.push(new Date().getTime());

        organization.$update(function () {
          $location.path('organizations/' + organization._id);
        });
      };

      $scope.find = function (query) {
        Organizations.query(query, function (organizations) {
          $scope.organizations = organizations;
        });
      };

      $scope.findOne = function () {
        Organizations.get(
          { organizationId: $stateParams.organizationId },
          function (organization) {
            $scope.organization = organization;
          }
        );
      };

      /**
       * Adds new division to stack
       * @param $event
       */
      $scope.addInstance = function ($event) {
        if ($event) {
          $event.preventDefault();
        }
        $scope.organization.divisions.push(_(defaultDivision).clone());
      };

      $scope.addInstance();

    }]);
});
