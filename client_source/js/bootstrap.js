/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
  'require',
  'angular',
  'angular-bootstrap',
  'app',
  'routes'
], function (require, ng) {
  'use strict';

  /* place operations that need to initialize prior to app start here
   * using the `run` function on the top-level module
   */

  require(['domReady!'], function (document) {
    // Fixing facebook bug with redirect
    if (window.location.hash == "#_=_") {
      window.location.hash = "";
    }

    // everything is loaded...go!
    ng.bootstrap(document, ['app']);
    ng.resumeBootstrap();
  });
});
