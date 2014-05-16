define(['./module'], function (module) {
  'use strict';

  // User service used for attributes REST endpoint
  module.factory('Users', ['$resource', function ($resource) {
    return $resource('users/:attributeId',
      { attributeId: '@_id' },
      { update: { method: 'PUT' } }
    );
  }]);
});
