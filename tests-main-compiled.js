/**
 * Monkey patching for RequireJS 'define' method in order to remove ^app/ substring in
 * dependency path for controllers, filters, services and directives.
 */
(function (global) {
  var original_define = global.define;
  // reg exp for testing if dependency is app file
  var isAppFile = /^Source\/(modules)\//;

  // Override
  global.define = function (name, deps, callback) {
    var args = Array.prototype.slice.apply(arguments);

    // Process only anonymous definitions
    if (args.length != 2) {
      return original_define.apply(null, args);
    }

    // basically deps and callback are defined only for specs for testing
    var deps = args[0], callback = args[1];
    if (deps instanceof Array && typeof callback == "function") {
      for (var i = 0; i < deps.length; i++) {
        if (isAppFile.test(deps[i]))
          deps[i] = deps[i].replace('Source/', '');
      }
    }

    original_define.apply(null, args);
  };

  // Enable AMD mode
  // Without this code line libs such as 'moment' or 'accounting' aren't being loaded
  // when we try to run tests for compiled .js file
  global.define.amd = original_define.amd;
})(this);

/**
 * another one monkey patch to prevent "no timestamp" error
 * https://github.com/karma-runner/karma-requirejs/issues/6#issuecomment-23037725
 */
(function (global) {
  var fileWithoutLeadingSlash;
  // array where all spec files will be included
  global.tests = [];

  for (var file in global.__karma__.files) {
    if (global.__karma__.files.hasOwnProperty(file)) {
      // get rid of leading slash in file path - prevents "no timestamp" error
      fileWithoutLeadingSlash = file.replace(/^\//, '');
      global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];
      delete global.__karma__.files[file];

      // we get all the test files automatically and store to window.tests array
      if (/spec\.js$/.test(fileWithoutLeadingSlash)) {
        global.tests.push(fileWithoutLeadingSlash);
      }
    }
  }
}(this));

require.config({
  baseUrl: 'base/',

  paths: {
    /* named modules for app deps */
    'Source': 'client_source/js',

    /* named modules for test dependencies */
    'angular-mocks': 'client_source/lib/angular-mocks/angular-mocks',
    'angular-scenario': 'client_source/lib/angular-scenario/angular-scenario',

    /* named modules for src */
    'angular': 'client_source/lib/angular/angular',
    'angular-bootstrap': 'client_source/lib/angular-bootstrap/ui-bootstrap',
    'angular-bootstrap-tpls': 'client_source/lib/angular-bootstrap/ui-bootstrap-tpls',
    'angular-cookies': 'client_source/lib/angular-cookies/angular-cookies',
    'angular-resource': 'client_source/lib/angular-resource/angular-resource',
    'angular-ui-router': 'client_source/lib/angular-ui-router/release/angular-ui-router',
    'async': 'client_source/lib/requirejs-plugins/src/async',
    'domReady': 'client_source/lib/requirejs-domready/domReady',
    'jquery': 'client_source/lib/jquery/jquery',
    'text': 'client_source/lib/requirejs-text/text',
    'underscore' : 'client_source/lib/underscore/underscore'
  },

  shim: {
    'angular': {
      exports: 'angular',
      deps: ['jquery', 'underscore']
    },
    'angular-bootstrap': {
      deps: ['angular']
    },
    'angular-bootstrap-tpls': {
      deps: ['angular']
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'angular-cookies': {
      deps: ['angular']
    },
    'angular-mocks': {
      deps: ['angular']
    },
    'angular-resource': {
      deps: ['angular']
    }
  },

  deps: ['require', './public/js/main'],

  callback: function (require) {
    // to ensure that source is already loaded before tests are tried to run
    require(
      // array with all spec files
      window.tests,
      // callback
      window.__karma__.start
    );
  }
});

// let Angular know that we're bootstrapping manually
// https://github.com/angular/angular.js/commit/603fe0d19608ffe1915d8bc23bf412912e7ee1ac
window.name = "NG_DEFER_BOOTSTRAP!";
