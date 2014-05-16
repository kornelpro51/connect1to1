define(['./module'], function (module) {
  'use strict';
//Attributes service used for attributes REST endpoint
  module.factory("Attributes", ['$resource', function ($resource) {
    return $resource('attributes/:attributeId',
      { attributeId: '@_id' },
      { update: { method: 'PUT' } }
    );
  }]);
});
