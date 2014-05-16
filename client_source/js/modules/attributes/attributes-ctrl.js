define(['./module'], function (module) {
  'use strict';

  module.controller('AttributesController', [
    '$scope',
    '$stateParams',
    '$location',
    'Attributes',
    function ($scope, $stateParams, $location, Attributes) {

      $scope.sections = {
        clinical: 'Clinical',
        demographic: 'Demographic'
      };

      $scope.types = {
        text: 'Textfield',
        select: 'Choice',
        multiselect: 'Multiple Choice'
      };

      $scope.attribute = {
        name: '',
        section: '',
        type: '',
        values: ''
      };

      $scope.create = function () {
        var attribute = new Attributes($scope.attribute);

        attribute.$save(
          function (response) {
            $location.path('attributes/' + response._id);
          },
          function (response) {
            $scope.errors = response.data.errors;
          }
        );
      };

      $scope.remove = function (attribute) {
        attribute.$remove();

        for (var i in $scope.attributes) {
          if ($scope.attributes[i] == attribute) {
            $scope.attributes.splice(i, 1);
          }
        }
      };

      $scope.update = function () {
        var attribute = $scope.attribute;
        if (!attribute.updated) {
          attribute.updated = [];
        }
        attribute.updated.push(new Date().getTime());

        attribute.$update(function () {
          $location.path('attributes/' + attribute._id);
        });
      };

      $scope.find = function (query) {
        Attributes.query(query, function (attributes) {
          $scope.attributes = attributes;
        });
      };

      $scope.findOne = function () {
        Attributes.get(
          { attributeId: $stateParams.attributeId },
          function (attribute) {
            $scope.attribute = attribute;
          }
        );
      };

    }]);
});
