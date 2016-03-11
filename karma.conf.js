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
    files: [],
    preprocessors: {},
    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    reporters: ['spec'],
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
