'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      build: {
        src: 'public/app/views/index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('test', function() {
    grunt.log.write('temp test placeholder');
  });

  grunt.registerTask('build', ['wiredep']);

};
