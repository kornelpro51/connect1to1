define(['./module'], function (module) {
  'use strict';
//Conditions service used for conditions REST endpoint
  module.factory("Conditions", ['$resource', function ($resource) {
    return $resource('conditions/:conditionId',
      { conditionId: '@_id' },
      { update: { method: 'PUT' } }
    );
  }]);
});
