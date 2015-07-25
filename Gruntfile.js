module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		tinypng: {
		    options: {
		        apiKey: "gkYVEg3qZfmpilH5Px2ng8hp28UrUctl",
		        summarize: true,
		        showProgress: true,
		        stopOnImageError: true
		    },
		    compress: {
		        expand: true, 
		        src: ['**/*.{png,jpg}'], 
		        cwd: 'src/img/',
		        dest: 'src/img/'
		    }
    	},
		responsive_images: {
	      dev: {
	        options: {
	          engine: 'im',
	          aspectRatio: false,
	          sizes: [{
	            width: 320,
	            height: 160,
	            suffix: '-sm'
	          },{
	            width: 600,
	            height: 375,
	            suffix: '-med'
	          }
	          ]
	        },
	        files: [{
	          expand: true,
	          src: ['thumb.jpg'],
	          cwd: 'src/img/work/proj-3/',
	          dest: 'src/img/work/proj-3/'
	        }]
	      }
	    },
		watch: {
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass:dist', 'autoprefixer']
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
		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
               	src: 'dist/css/styles.min.css'	
            } 
        },
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'dist/css/styles.min.css': 'src/sass/all.scss'
				}
			}
		},
		copy: {
			dist: {
				src: ['js/vendor/**/*.js', 'img/**/*'],
				dest: 'dist',
				expand: true,
				cwd: 'src'
			}
		},
		concat: {
		  	js: {
		    	src: ['src/js/vendor/jquery-1.11.3.js', 'src/js/vendor/slick.js', 'src/js/main.js'],
		    	dest: 'src/js/custom.js'
		  	}
		},
		uglify: {
		   dist: {
		      options: {
		         sourceMap: true
		      },
		      files: {
		         'dist/js/custom.min.js': ['src/js/custom.js'],
		      }
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
		}
	});
	
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-image');
	grunt.loadNpmTasks('grunt-tinypng');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('setup', ['sass', 'concat', 'uglify', 'includereplace', 'copy']);
	grunt.registerTask('js', ['concat', 'uglify', 'copy']);
	grunt.registerTask('default', ['watch']);
};
