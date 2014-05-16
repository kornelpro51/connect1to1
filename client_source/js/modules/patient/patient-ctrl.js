define(['./module'], function (module) {
  'use strict';

  module.controller('PatientController', [
    '$scope',
    '$stateParams',
    '$location',
    'Patients',
    'AttributesService',
    function ($scope, $stateParams, $location, Patients, AttributesService) {
      $scope.today = new Date();
      $scope.patientInfo = {
        name            : '',
        email           : '',
        phonenumber     : '',
        gender          : 'Male',
        birthdate       : '1980-01-01',

        demographicInfo : '',
        clinicalInfo    : '',

        schedules       : []
      };
      $scope.uiConfig = {
        demographicInfoList: [],
        clinicalInfoList: []
      }

      $scope.create = function () {
        var patient = new Patients($scope.patientInfo);

        patient.$save(
          function (response) {
            $location.path('patients/' + response._id);
          },
          function (response) {
            $scope.errors = response.data.errors;
          }
        );
      };

      $scope.remove = function (patient) {
        patient.$remove();
        $scope.patients.splice($scope.patients.indexOf(patient), 1);

      };

      $scope.update = function () {
        var patient = $scope.patient;
        if (!patient.updated) {
          patient.updated = [];
        }
        patient.updated.push(new Date().getTime());

        patient.$update(function () {
          $location.path('patients/' + patient._id);
        });
      };

      $scope.find = function (query) {
        Patients.query(query, function (patients) {
          $scope.patients = patients;
        });
      };

      $scope.findOne = function () {
        Patients.get(
          { patientId: $stateParams.patientId },
          function (patient) {
            $scope.patient = patient;

          }
        );
      };
      $scope.loadAttributes = function() {
        var idx;
        AttributesService.getAttributeInfo().then(function(result){
          if(result.err === 0) {
            $scope.uiConfig.demographicInfoList = result.data.dmg;
            $scope.uiConfig.clinicalInfoList = result.data.clc;
            for (idx in $scope.uiConfig.demographicInfoList) {
              if($scope.patient.demographicId._id == $scope.uiConfig.demographicInfoList[idx]._id) {
                $scope.patient.demographicId = $scope.uiConfig.demographicInfoList[idx];
              }
            }
            for (idx in $scope.uiConfig.clinicalInfoList) {
              if($scope.patient.clinicalId._id == $scope.uiConfig.clinicalInfoList[idx]._id) {
                $scope.patient.clinicalId = $scope.uiConfig.clinicalInfoList[idx];
              }
            }
          }
        });
      }
      $scope.resendActivationEmail = function() {

      }
      /**
       * Phone number validation check.
       * @param value
       * @returns {*}
       */
      $scope.validatePhone = function(value) {
        var re = /^\d{3}-\d{3}-\d{4}$/;
        if (value === '' || typeof value == 'undefined')
          return true;
        if (re.test(value))
          return true;
        return undefined;
      };
    }]);
});
