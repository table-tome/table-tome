module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.registerTask('test', 'Test some stuff.', function() {
    grunt.log.write('testing some stuff...').ok();
  });

};
