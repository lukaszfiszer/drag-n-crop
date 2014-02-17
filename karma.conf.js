// Karma configuration
// Generated on Sat Feb 15 2014 14:29:17 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/jquery.js',
      'bower_components/jquery-ui/ui/jquery.ui.core.js',
      'bower_components/jquery-ui/ui/jquery.ui.widget.js',
      'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
      'bower_components/jquery-ui/ui/jquery.ui.draggable.js',
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/eventie/eventie.js',
      'bower_components/imagesloaded/imagesloaded.js',
      'bower_components/chai/chai.js',
      'jquery.drag-n-crop.js',
      'jquery.drag-n-crop.css',
      'tests/*.js',
      {
        pattern: 'tests/fixtures/*',
        included: false,
        served: true
      }
    ],


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
