module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'app.js'],
      options:{
        "esversion": 6
      }
    },
    'http-server': {
      port: 8282,
      host: "0.0.0.0"
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    uglify:{
      build: {
        src: 'dist/app.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/app.js': 'app.js'
        }
      }
    },
    sass: {
       dist: {
         files: {
           'style.css': 'style.scss'
         }
       }
     }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.registerTask('default', ['sass', 'jshint', 'babel', 'uglify', 'http-server']);

};
