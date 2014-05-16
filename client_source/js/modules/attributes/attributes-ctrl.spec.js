define(['angular-mocks', 'Source/modules/attributes/attributes-ctrl'], function () {
  describe('AttributesController', function () {

    var scope, subject, httpBackend;

    var Attributes = function() {};

    Attributes.prototype = jasmine.createSpyObj('Attributes', ['$save']);

    beforeEach(function () {

      module('app.attributes');

      module(function ($provide) {
        $provide.value('Global', {});
        $provide.value('Attributes', Attributes);
      });

      inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        subject = $controller('AttributesController', {$scope: scope});
        httpBackend = $httpBackend;
      });
    });

    describe('check if controller is on it\'s place', function () {
      it('should have loaded the subject', function () {
        expect(subject).toBeDefined();
      });
    });

    describe('check if scope is also on it\'s place', function () {
      it('should test scope to be defined', function () {
        expect(scope).toBeDefined();
      });
    });

    describe('create()', function () {
      it('should send ajax call', function() {
        scope.name = 'foo';
        scope.attributes = ['bar', 'baz'];

        scope.create();

        expect(Attributes.prototype.$save).toHaveBeenCalled();
      });
    });

  });
});
