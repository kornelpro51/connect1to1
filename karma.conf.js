// Karma configuration
// Generated on Wed Mar 20 2013 21:20:26 GMT+0200 (EET)
module.exports = function (config) {
  var sourceFolder = 'client_source/js/',
      libFolder = 'client_source/lib/';

  config.set({


// base path, that will be used to resolve files and exclude
    basePath: './',

    frameworks: ['jasmine', 'requirejs'],

    plugins: [
      'karma-script-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-requirejs',
      'karma-phantomjs-launcher'
    ],

// list of files / patterns to load in the browser
    files: [
      'tests-main.js',
      { pattern: sourceFolder + '**/*.js', included: false },
      { pattern: libFolder + '**/*.js', included: false }
    ],

// list of files to exclude
    exclude: [
      sourceFolder + 'main.js'
    ],


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
    reporters: ['dots'],


// web server port
    port: 9876,


// cli runner port
    runnerPort: 9100,


// enable / disable colors in the output (reporters and logs)
    colors: true,


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


// enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
    browsers: ['PhantomJS'],


// If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
    singleRun: false

  });
};
