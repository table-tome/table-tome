'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],
    client: {
      mocha: {
        timeout: 5000
      }
    },
    files: [
      // bower:js
      // endbower
    ],
    preprocessors: {},
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    reporters: ['spec'],
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
