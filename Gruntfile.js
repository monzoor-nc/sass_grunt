module.exports = function(grunt){

grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Start of style grunt 
		sass_globbing: {
			your_target: {
				files: {
					'sass/main.scss': [
									'sass/common/**/*.scss',
									'sass/pages/**/*.scss'
								]
					},
				options: {
					useSingleQuotes: true
				}
			}
		},
		sass: {
			dist: {
				options: {
				  "sourcemap=none": '',
				  // nested, compact, compressed, expanded
				  'style':'expanded'
				},
				files: {
					'style/style.css' : 'sass/main.scss'
				}
			}
		},

		watch: {
			options: {
				livereload: 8000,
			},
			html: {
				files: ['*.html'],
				options: {
			    	livereload: true
			    }
			},
			js: {
				files: ['js/**/*.js']
			},
			sass: {
			    files: '**/*.scss',
			    tasks: ['sass_globbing','sass']
			  }
		},
		
		 // End of style grunt 

		 

		concat: {
			js: {
				src: 'js/*.js',
				dest: 'build/js/concat.js'
			},
			css: {
				src: 'style/*.css',
				dest: 'build/css/concat.css'
			}
		},//End of concat

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'build/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css/',
					ext: '.min.css'
				}]
			}
		},

		uglify: {
		    options: {
		      mangle: {
		        except: ['jQuery', 'Angular']
		      }
		    },
		    my_target: {
		      files: {
		        'build/js/output.min.js': ['build/js/*.js']
		      }
		    }
		},

		clean : {
		    yourTarget : {
		        src : [ 
		        		'build/js/concat.js',
		        		'build/css/concat.css'
		        	]
		    }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	// Creating main.css
	grunt.loadNpmTasks('grunt-sass-globbing');
	// Concating js and css
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Uglify js
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Uglify css
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// Clean concated files from build
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-connect');



	/*
		Command list
		
		grunt dev	
		grunt watch

		grunt deploy
	*/
	grunt.registerTask('dev', ['sass_globbing','sass']);

	grunt.registerTask('deploy', ['sass_globbing','sass', 'concat', 'uglify', 'cssmin', 'clean']);
}