module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/*.js',
        dest: 'static/*.min.js'
      }
    },
    copy: {
      main: {
        expand: false,
        src: 'node_modules/jquery/dist/core.js',
        dest: 'src/'
      }
    }
  })

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify'])
}
