module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    targethtml: {
      dist: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      },
      dev: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/PassSafe.js': ['src/PassSafe/app.js']
        }
      },
      options: {
        noParse: ['src/vendor/triplesec-1.0.0-min.js']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> built on <%= grunt.template.today("dd-mm-yyyy") %> <&= pkg.repository %> */\n'
      },
      dist: {
        files: {
          'dist/PassSafe.min.js': ['dist/PassSafe.js']
        }
      }
    },

    copy: {
      dist: {
        cwd: 'src/PassSafe/adapter/',
        src: '*',
        dest: 'dist/adapter/',
        filter: 'isFile',
        expand: true
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.html'],
        tasks: ['browserify', 'copy', 'targethtml'],
        options: {
          spawn: false
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify', 'uglify', 'targethtml', 'copy']);
  grunt.registerTask('dev', ['browserify', 'targethtml', 'copy']);

};
