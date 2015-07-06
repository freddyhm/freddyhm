module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass:dist']
			},
			livereload: {
				options: {
					livereload: true,
					spawn: false
				},
				files: ['dist/css/*.css', 'dist/index.html', 'dist/projects/*.html']
			},
			html: {
		    	files: ['src/includes/*.html', 'index.html'],
		    	tasks: ['includereplace']
			},
			project: {
				files: ['src/includes/projects/*.html'],
				tasks: ['copy:project']
			}
		},
		sass: {
			options: {
				//sourceMap: true,
			//	outputStyle: 'compressed'
			},
			dist: {
				files: {
					'dist/css/styles.css': 'src/sass/all.scss'
				}
			}
		},
		copy: {
			dist: {
				src: ['js/vendor/**/*.js', 'img/**/*', 'css/fonts/*'],
				dest: 'dist',
				expand: true,
				cwd: 'src'
			},
			project: {
				src: ['projects/*'],
				dest: 'dist',
				expand: true,
				cwd: 'src/includes'
			}
		},
		concat: {
		  	js: {
		    	src: ['src/js/*.js'],
		    	dest: 'dist/js/main.js'
		  	}
		},
		includereplace: {
			files: {
		    	src: ['index.html', 'projects/*.html'],
		    	dest: 'dist/'
		  	}
		},
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('setup', ['sass', 'copy', 'concat', 'includereplace']);
	
	grunt.registerTask('default', ['watch']);
};
