'use strict';

module.exports = function(grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch (e) {
    localConfig = {};
  }

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.registerTask('test', 'Test some stuff.', function() {
    grunt.log.write('testing some stuff...').ok();
  });


};
