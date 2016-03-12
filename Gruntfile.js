'use strict';

module.exports = function(grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch (e) {
    localConfig = {};
  }

  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control',
    bower: 'grunt-bower-task',
    auto_install: 'grunt-auto-install',
    istanbul_check_coverage: 'grunt-mocha-istanbul',
    ngconstant: 'grunt-ng-constant'
  });

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      options: {
        targetDir: 'client/bower_components',
        layout: 'byType',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {}
      },
      all: {
        src: ['bower.json', '.bowerrc'],
      },
      install: {}
    },
    auto_install: {
      all: {
        local: {},
        subdir: {
          options: {
            bower: false
          }
        },
        src: ['package.json']
      }
    },
    jscs: {
      options: {
        config: ".jscsrc"
      },
      main: {
        files: {
          src: [
            'client/app/**/*.js',
            'server/**/*.js'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/!(.git*|.openshift|Procfile)**'
          ]
        }]
      },
      server: '.tmp'
    },
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },
    nodemon: {
      debug: {
        script: 'server',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function() {
              setTimeout(function() {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },
    wiredep: {
      options: {
        exclude: []
      },
      client: {
        src: 'client/index.html',
        ignorePath: 'client/',
      },
      test: {
        src: './karma.conf.js',
        devDependencies: true
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'mocha.conf.js',
        timeout: 5000 // set default mocha spec timeout
      },
      unit: {
        src: ['server/**/*.spec.js']
      },
      integration: {
        src: ['server/**/*.integration.js']
      }
    },
    mocha_istanbul: {
      unit: {
        options: {
          excludes: ['**/*.{spec,mock,integration}.js'],
          reporter: 'spec',
          require: ['mocha.conf.js'],
          mask: '**/*.spec.js',
          coverageFolder: 'coverage/server/unit'
        },
        src: 'server'
      },
      integration: {
        options: {
          excludes: ['**/*.{spec,mock,integration}.js'],
          reporter: 'spec',
          require: ['mocha.conf.js'],
          mask: '**/*.integration.js',
          coverageFolder: 'coverage/server/integration'
        },
        src: 'server'
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage/**',
          check: {
            lines: 80,
            statements: 80,
            branches: 80,
            functions: 80
          }
        }
      }
    },
    env: {
      test: {
        NODE_ENV: 'test',
        src: './server/config/local.env'
      },
      dev: {
        NODE_ENV: 'development',
        src: './server/config/local.env'
      },
      heroku: {
        NODE_ENV: 'production',
        src: '.env'
      },
    }
  });

  grunt.registerTask('test', function(target, option) {
    if (target === 'server') {
      return grunt.task.run([
        'env:test',
        'mochaTest:unit',
        'mochaTest:integration'
      ]);
    } else if (target === 'client') {
      return grunt.task.run([
        'env:test',
        'wiredep:test',
        'karma'
      ]);
    } else if (target === 'coverage') {
      if (option === 'unit') {
        return grunt.task.run([
          'env.test',
          'mocha_istanbul:unit'
        ]);
      } else if (option === 'integration') {
        return grunt.task.run([
          'env:test',
          'mocha_istanbul:integration'
        ]);
      } else if (option === 'check') {
        return grunt.task.run([
          'istanbul_check_coverage'
        ]);
      } else {
        return grunt.task.run([
          'env:test',
          'mocha_istanbul',
          'istanbul_check_coverage'
        ]);
      }
    } else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });




};
