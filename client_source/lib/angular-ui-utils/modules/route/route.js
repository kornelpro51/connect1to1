/**
 * Set a $uiRoute boolean to see if the current route matches
 */
angular.module('ui.route', []).directive('uiRoute', ['$location', '$parse', function ($location, $parse) {
  return {
    restrict: 'AC',
    scope: true,
    compile: function (tElement, tAttrs) {
      var useProperty;
      if (tAttrs.uiRoute) {
        useProperty = 'uiRoute';
      } else if (tAttrs.ngHref) {
        useProperty = 'ngHref';
      } else if (tAttrs.href) {
        useProperty = 'href';
      } else {
        throw new Error('uiRoute missing a route or href property on ' + tElement[0]);
      }
      return function ($scope, elm, attrs) {
        var modelSetter = $parse(attrs.ngModel || attrs.routeModel || '$uiRoute').assign;
        var watcher = angular.noop;

        // Used by href and ngHref
        function staticWatcher(newVal) {
          // waits for https://github.com/angular-ui/ui-utils/issues/127
          var hash = newVal.indexOf('#!');
          if (hash > -1) {
            newVal = newVal.substr(hash + 2);
          }
          watcher = function watchHref() {
            modelSetter($scope, ($location.path().indexOf(newVal) > -1));
            console.log('found', $location.path().indexOf(newVal) > -1);
          };
          watcher();
        }

        // Used by uiRoute
        function regexWatcher(newVal) {
          var hash = newVal.indexOf('#!');
          if (hash > -1) {
            newVal = newVal.substr(hash + 2);
          }
          watcher = function watchRegex() {
            var regexp = new RegExp('^' + newVal + '$', ['i']);
            modelSetter($scope, regexp.test($location.path()));
          };
          watcher();
        }

        switch (useProperty) {
          case 'uiRoute':
            // if uiRoute={{}} this will be undefined, otherwise it will have a value and $observe() never gets triggered
            if (attrs.uiRoute) {
              regexWatcher(attrs.uiRoute);
            } else {
              attrs.$observe('uiRoute', regexWatcher);
            }
            break;
          case 'ngHref':
            // Setup watcher() every time ngHref changes
            if (attrs.ngHref) {
              staticWatcher(attrs.ngHref);
            } else {
              attrs.$observe('ngHref', staticWatcher);
            }
            break;
          case 'href':
            // Setup watcher()
            staticWatcher(attrs.href);
            break;
        }

        $scope.$on('$routeChangeSuccess', function () {
          watcher();
        });

        //Added for compatibility with ui-router
        $scope.$on('$stateChangeSuccess', function () {
          watcher();
        });
      };
    }
  };
}]);
