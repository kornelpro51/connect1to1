module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      jade: {
        files: ['app/views/**']
      },
      js: {
        files: ['client_source/js/**/*.js', 'app/**/*.js'],
        tasks: ['jshint']
      },
      html: {
        files: ['client_source/**/*.jade']
      },
      css: {
        files: ['client_source/assets/css/**']
      },
      scss: {
        options: {
          livereload: false
        },
        files: ['client_source/scss/**'],
        tasks: ['compass']
      }
    },
    jshint: {
      all: ['gruntfile.js', 'client_source/js/**/*.js', 'test/**/*.js', 'app/**/*.js']
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    karma: {
      ci: { // runs tests one time in PhantomJS, good for continuous integration
        configFile: 'karma-compiled.conf.js'
      },
      unit: { // start testing server that listens for code updates
        configFile: 'karma.conf.js',
        singleRun: false,
        browsers: ['Chrome']
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'client_source/assets/',
            src: ['**/*'],
            dest: 'public/assets'
          },
          {
            expand: true,
            cwd: 'client_source/partials/',
            src: ['**/*'],
            dest: 'public/partials'
          },
          {
            expand: true,
            cwd: 'client_source/lib/requirejs/',
            src: ['require.js'],
            dest: 'public/lib/requirejs/'
          },
          {
            expand: true,
            cwd: 'client_source/lib/requirejs-domready/',
            src: ['domReady.js'],
            dest: 'public/lib/requirejs-domready/'
          },
          {
            expand: true,
            cwd: 'client_source/js/modules/',
            src: ['**/*.html'],
            dest: 'public/js/modules/'
          }
        ]
      }
    },
    requirejs: {
      compile: {
        options: grunt.file.readJSON('client_source/js/build-config.json')
      }
    },
    uglify: {
      main: {
        options: {
          mangle: false
        },
        files: {
          'public/js/main.js': ['public/js/main-src.js']
        }
      }
    },
    compass: {
      main: {
        options: {
          config: 'config.rb'
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compass');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['jshint', 'concurrent']);

  //Test task.
  grunt.registerTask('test', ['mochaTest']);

  // Build tasks
  grunt.registerTask('build-js', ['copy', 'requirejs', 'uglify']);
  grunt.registerTask('build-css', ['compass']);
  grunt.registerTask('build', ['build-css', 'build-js']);

};
