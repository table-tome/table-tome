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
    changed: {
      options: {
        cache: '.changed_cache'
      }
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
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
      }
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
    watch: {
      installBower: {
        files: ['bower.json', '.bowerrc'],
        tasks: ['changed:bower']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      installNPM: {
        files: ['package.json'],
        tasks: ['changed:auto_install']
      },
      mochaTest: {
        files: ['server/**/*.{spec,integration}.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: ['client/{app,components}/**/*.{spec,mock}.js'],
        tasks: ['newer:jshint:all', 'wiredep:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
    },
    jshint: {
      options: {
        jshintrc: 'client/.jshintrc',
        reporter: require("jshint-stylish")
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: ['server/**/!(*.spec|*.integration).js']
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.{spec,integration}.js']
      },
      all: ['client/{app,components}/**/!(*.spec|*.mock|app.constant).js'],
      test: {
        src: ['client/{app,components}/**/*.{spec,mock}.js']
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
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({ browsers: ['last 2 version'] })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
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
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('test', function(target, option) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest:unit',
        'mochaTest:integration'
      ]);
    } else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'concurrent:pre',
        'concurrent:test',
        'injector',
        'postcss',
        'wiredep:test',
        'karma'
      ]);
    } else if (target === 'e2e') {
      if (option === 'prod') {
        return grunt.task.run([
          'build',
          'env:all',
          'env:prod',
          'express:prod',
          'protractor'
        ]);
      } else {
        return grunt.task.run([
          'clean:server',
          'env:all',
          'env:test',
          'concurrent:pre',
          'concurrent:test',
          'injector',
          'wiredep:client',
          'postcss',
          'express:dev',
          'protractor'
        ]);
      }
    } else if (target === 'coverage') {

      if (option === 'unit') {
        return grunt.task.run([
          'env:all',
          'env:test',
          'mocha_istanbul:unit'
        ]);
      } else if (option === 'integration') {
        return grunt.task.run([
          'env:all',
          'env:test',
          'mocha_istanbul:integration'
        ]);
      } else if (option === 'check') {
        return grunt.task.run([
          'istanbul_check_coverage'
        ]);
      } else {
        return grunt.task.run([
          'env:all',
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
