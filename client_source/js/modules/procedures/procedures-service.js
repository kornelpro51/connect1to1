define(['./module'], function (module) {
  'use strict';
//Procedures service used for procedures REST endpoint
  module.factory("Procedures", ['$resource', function ($resource) {
    return $resource('procedures/:procedureId',
      { procedureId: '@_id' },
      { update: { method: 'PUT' } }
    );
  }]);
});
