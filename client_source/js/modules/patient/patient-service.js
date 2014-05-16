define(['./module'], function (module) {
  'use strict';
//Attributes service used for attributes REST endpoint
  module.factory("AttributesService", ['$http', function ($http) {
    var attrService = {
      getAttributeInfo: function() {
        var promise = $http.get('/attributes/dcdata').then(function(response){
          return response.data;
        });
        return  promise;
      },
      resendActivationEmail: function() {
        var promise = $http.post('/patients/:patientId/newmail').then(function(response){
          return response.data;
        });
        return  promise;
      }
    };
    return attrService;
  }]).factory('Patients', ['$resource', function($resource){

      return  $resource('patients/:patientId',
        { patientId: '@_id' },
        { update: { method: 'PUT' } }
      );
  }]);
});
