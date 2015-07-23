module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		imagemin: {
		    png: {
		      options: {
		        optimizationLevel: 7
		      },
		      files: [
		        {
		          // Set to true to enable the following options…
		          expand: true,
		          // cwd is 'current working directory'
		          cwd: 'project-directory/img/',
		          src: ['**/*.png'],
		          // Could also match cwd line above. i.e. project-directory/img/
		          dest: 'project-directory/img/compressed/',
		          ext: '.png'
		        }
		      ]
		    },
		    jpg: {
		      options: {
		        progressive: true
		      },
		      files: [
		        {
		          // Set to true to enable the following options…
		          expand: true,
		          // cwd is 'current working directory'
		          cwd: 'project-directory/img/',
		          src: ['**/*.jpg'],
		          // Could also match cwd. i.e. project-directory/img/
		          dest: 'project-directory/img/compressed/',
		          ext: '.jpg'
		        }
		      ]
		    }
		 },
		responsive_images: {
	      dev: {
	        options: {
	          engine: 'im',
	          sizes: [{
	            width: 1920,
	            suffix: '-large',
	            quality: 100
	          },{
	            width: 960,
	            suffix: '-medium',
	            quality: 100
	          },{
	            width: 480,
	            suffix: '-small',
	            quality: 100
	          }
	          ]
	        },
	        files: [{
	          expand: true,
	          src: ['sunny-beach.jpg'],
	          cwd: 'src/img/',
	          dest: 'dist/img/'
	        }]
	      }
	    },
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
				files: ['dist/css/*.css', 'dist/*.html', 'dist/js/**/*.js']
			},
			html: {
		    	files: ['src/includes/**/*.html', 'index.html'],
		    	tasks: ['includereplace']
			},
			vendorjs: {
				files: ['src/js/vendor/**/*.js'],
				tasks: ['copy']
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['concat']
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
			}
		},
		concat: {
		  	js: {
		    	src: ['src/js/*.js'],
		    	dest: 'dist/js/main.js'
		  	}
		},
		includereplace: {
			index: {
				src: ['index.html'],
		    	dest: 'dist/'
		  	},
		  	projects: {
		  		cwd: 'src/includes/projects/',
		  		expand: true,
		    	src: ['*.html'],
		    	dest: 'dist/'
		  	}
		},
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('imagemin', ['imagemin']);
	grunt.registerTask('setup', ['sass', 'copy', 'concat', 'includereplace']);
	grunt.registerTask('default', ['watch']);
};
