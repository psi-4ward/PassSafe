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

    concat: {
      localstorage: {
        src: ['src/PassSafe/app.js', 'src/PassSafe/adapter/localstorage.js'],
        dest: 'src/PassSafe/app.js'
      },
      redmine: {
        src: ['src/PassSafe/app.js', 'src/PassSafe/adapter/localstorage.js'],
        dest: 'src/PassSafe/app.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> built on <%= grunt.template.today("dd-mm-yyyy") %> <%= pkg.repository.url %> */\n'
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
      },
      redmine: {
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: 'index.html',
            dest: 'plugins/redmine_wiki_passsafe/assets/'
          },
          {
            expand: true,
            cwd: 'dist',
            src: 'PassSafe.min.js',
            dest: 'plugins/redmine_wiki_passsafe/assets/'
          }
        ]
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify', 'concat:localstorage', 'uglify', 'targethtml:dist', 'copy:dist']);
  grunt.registerTask('dev', ['browserify', 'targethtml', 'copy:dist']);
  grunt.registerTask('redmine', 'Build the redmine plugin in plugins/redmine_wiki_passsafe', ['browserify', 'concat:redmine', 'uglify', 'targethtml:dist', 'copy:redmine'])

};
