define(['./module'], function (module) {
  'use strict';

  // Attributes service used for attributes REST endpoint
  module.factory('Organizations', ['$resource', function ($resource) {
    return $resource(
      'organizations/:organizationId',
      { organizationId: '@_id' },
      { update: { method: 'PUT' } }
    );
  }]);
});
