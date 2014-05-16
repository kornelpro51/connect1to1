define(['angular-mocks', 'Source/modules/organizations/organizations-ctrl'], function () {

  describe('OrganizationsController', function () {

    var scope, subject, httpBackend, Organizations;

    beforeEach(function () {
      Organizations = function() {};
      Organizations.prototype = jasmine.createSpyObj('Users', ['$save']);

      module('app.organizations');

      module(function ($provide) {
        $provide.value('Global', {});
        $provide.value('Users', jasmine.createSpyObj('Users', ['query']));
        $provide.value('Organizations', Organizations);
      });

      inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        subject = $controller('OrganizationsController', { $scope: scope });
      });
    });

    describe('create()', function () {
      it('should send ajax call', function() {
        scope.name = 'foo';
        scope.attributes = ['bar', 'baz'];

        scope.create();

        expect(Organizations.prototype.$save).toHaveBeenCalled();
      });
    });


  });
});
