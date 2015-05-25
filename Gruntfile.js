module.exports = function( grunt ) {
  'use strict';

  function readOptionalJSON( filepath ) {
    var data = {};
    try {
      data = grunt.file.readJSON( filepath );
    } catch ( e ) {}
    return data;
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    jsonlint: {
      pkg: {
        src: [ 'package.json' ]
      },

      bower: {
        src: [ 'bower.json' ]
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/chess.js': ['src/main.js'],
        },
        options: {
          browserifyOptions: {
            standalone: 'Chess'
          } 
        }
      }
    },

    jshint: {

      files: [
        'src/main.js', 'Gruntfile.js', 'test/**/*.js'
      ],
      options: {
        jshintrc: true
      }
     
    },

    jscs: {
      src: 'src/*.js',
      options: {
        config: '.jscsrc'
      }
    },

    watch: {
      files: [ '<%= jshint.files %>' ],
      tasks: [ 'dev' ]
    },

    uglify: {
      all: {
        files: {
          'dist/chess.min.js': [ 'dist/chess.js' ]
        },
        options: {
          preserveComments: false,
          report: 'min',
          beautify: {
            'ascii_only': true
          },
          banner: '/*! Chess.js v<%= pkg.version %> | ' +
            'Copyright (c) 2015, Jeff Hlywa (jhlywa@gmail.com) | github.com/jhlywa/chess.js/blob/master/LICENSE */',
          compress: {
            'hoist_funs': false,
            loops: false,
            unused: false
          }
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          ui: 'tdd'
        },
        src: ['tests/tests.js']
      }
    }

  });

  // Load grunt tasks from NPM packages
  require( 'load-grunt-tasks' )( grunt );

  grunt.registerTask( 'lint', [ 'jsonlint', 'jshint', 'jscs' ] );


  // Short list as a high frequency watch task
  grunt.registerTask( 'dev', ['lint', 'mochaTest', 'browserify'] );

  grunt.registerTask( 'default', ['dev', 'uglify'] );
};
