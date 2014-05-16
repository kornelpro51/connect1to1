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
})(this);

require.config({
  baseUrl: 'base/',

  paths: {
    /* named modules for app deps */
    'Source': 'client_source/js',

    /*named modules for test dependencies*/
    'angular-mocks': 'client_source/lib/angular-mocks/angular-mocks',
    'angular-scenario': 'client_source/lib/angular-scenario/angular-scenario',

    /* named modules for src */
    'angular': 'client_source/lib/angular/angular',
    'angular-bootstrap': 'client_source/lib/angular-bootstrap/ui-bootstrap',
    'angular-bootstrap-tpls': 'client_source/lib/angular-bootstrap/ui-bootstrap-tpls',
    'angular-cookies': 'client_source/lib/angular-cookies/angular-cookies',
    'angular-resource': 'client_source/lib/angular-resource/angular-resource',
    'angular-ui-router': 'client_source/lib/angular-ui-router/release/angular-ui-router',
    'angular-ui-select2' : 'client_source/lib/angular-ui-select2/src/select2',
    'async': 'client_source/lib/requirejs-plugins/src/async',
    'domReady': 'client_source/lib/requirejs-domready/domReady',
    'jquery': 'client_source/lib/jquery/jquery',
    'text': 'client_source/lib/requirejs-text/text',
    'underscore' : 'client_source/lib/underscore/underscore',
    'select2' : 'client_source/lib/select2/select2'
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
    },
    'angular-ui-select2': {
      deps: ['angular', 'select2']
    },
    'select2': {
      deps: ['jquery']
    },

  },

  // array with all spec files
  deps: window.tests,

  callback: window.__karma__.start
});
