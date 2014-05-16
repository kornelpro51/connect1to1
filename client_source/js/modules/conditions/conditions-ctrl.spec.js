define(['angular-mocks', 'Source/modules/conditions/conditions-ctrl'], function () {
  describe('ConditionsController', function () {

    var scope, subject, httpBackend, Conditions;

    beforeEach(function () {
      Conditions = function() {};
      Conditions.prototype = jasmine.createSpyObj('Conditions', ['$save']);

      module('app.conditions');

      module(function ($provide) {
        $provide.value('Global', {});
        $provide.value('Conditions', Conditions);
        $provide.value('Attributes', jasmine.createSpyObj('Attributes', ['query']));
      });

      inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        subject = $controller('ConditionsController', {$scope: scope});
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

        expect(Conditions.prototype.$save).toHaveBeenCalled();
      });
    });

  });
});
