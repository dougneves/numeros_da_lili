module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/*.js',
        dest: 'static/bundle.min.js'
      }
    },
    copy: {
      main: {
        flatten: true,
        src: 'node_modules/jquery/dist/core.js',
        dest: 'src/core.js'
      }
    }
  })

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify'])
}
