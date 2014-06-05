
module.exports = (grunt) ->

	# Grunt config
	grunt.initConfig

		# Copy
		copy:
			build:
				files: [
					{
						expand: true
						cwd: 'src/'
						src: ['**/*', '!**/*.ts']
						dest: 'build/'
						filter: 'isFile'
					}
				]

		# Typescript
		typescript:
			compile:
				src: ['./src/**/*.ts']
				dest: './build/app.js'
				options:
					noImplicitAny: true

		# Uglify
		uglify:
			options:
				mangle: true
				compress: true
				wrap: true
			compile:
				files:
					'build/app.min.js': 'build/app.js'

		# Connect
		connect:
			server:
				options:
					port: 4000
					base: 'build/'
					hostname: '*'

		# Watch files
		watch:
			js:
				files: 'src/**/*.ts'
				tasks: [ 'typescript', 'uglify' ]

			plain:
				files: 'src/**/*'
				tasks: [ 'copy' ]

		# Clean
		clean:
			build:
				src: [ 'build/' ]

	# Load Grunt Tasks
	grunt.loadNpmTasks 'grunt-contrib-connect'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-typescript'

	# Tasks definitions
	grunt.registerTask 'js',      [ 'typescript', 'uglify' ]
	grunt.registerTask 'build',   [ 'clean', 'copy', 'js' ]
	grunt.registerTask 'default', [ 'build', 'connect', 'watch' ]

