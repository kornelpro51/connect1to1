define(['angular-mocks', 'Source/modules/procedures/procedures-ctrl'], function () {
  describe('ProceduresController', function () {

    var scope, subject, httpBackend, Procedures;

    beforeEach(function () {
      Procedures = function() {};
      Procedures.prototype = jasmine.createSpyObj('Procedures', ['$save']);

      module('app.procedures');

      module(function ($provide) {
        $provide.value('Global', {});
        $provide.value('Procedures', Procedures);
        $provide.value('Attributes', jasmine.createSpyObj('Attributes', ['query']));
      });

      inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        subject = $controller('ProceduresController', {$scope: scope});
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

        expect(Procedures.prototype.$save).toHaveBeenCalled();
      });
    });

  });
});
