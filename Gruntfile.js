module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt
			.initConfig({

				pkg : grunt.file.readJSON('package.json'),

				uglify : {
					options : {
						banner : '/*! <%= pkg.title %> <%= pkg.version %> */'
					},
					build : {
						src : 'src/<%= pkg.name %>.js',
						dest : 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
					}
				},

				jshint : {
					options : {
						laxbreak : true,
						'-W093' : true,
						'-W030' : true,
						'-W083' : true,
						'-W061' : true
					},
					all : [ 'Gruntfile.js', 'src/**/*.js' ]
				},

				clean : [ 'dist' ],

				copy : {
					dist : {
						files : [ {
							expand : true,
							cwd : 'src',
							src : [ 'favicon.ico', 'logo.svg', 'main.js',
									'scripts/*', 'fonts/*', 'images/*' ],
							dest : 'dist'
						} ]
					}
				},

				'string-replace' : {
					inline : {
						files : [ {
							expand : true,
							cwd : 'src',
							src : 'index.html',
							dest : 'dist'
						} ],
						options : {
							replacements : [
									{
										pattern : '<%= pkg.name %>.js',
										replacement : '<%= pkg.name %>-<%= pkg.version %>.min.js'
									}, {
										pattern : /_titl/g,
										replacement : '<%= pkg.title %>'
									}, {
										pattern : /_desc/g,
										replacement : '<%= pkg.description %>'
									} ]
						}
					}
				},

				sass : {
					main : {
						files : [ {
							expand : true,
							cwd : 'src/styles',
							src : [ 'main.scss' ],
							dest : 'dist/styles',
							ext : '.css'
						} ]
					}
				},

				watch : {
					main : {
						files : [ 'Gruntfile.js', 'src/**' ],
						tasks : [ 'default' ],
						options : {
							livereload : true
						}
					}
				},

				connect : {
					dist : {
						options : {
							port : 9001,
							base : 'dist',
							livereload : true
						}
					}
				},

			});

	grunt.registerTask('default', [ 'clean', 'jshint', 'uglify', 'copy',
			'string-replace', 'sass' ]);

	grunt.registerTask('serve', [ 'default', 'connect', 'watch' ]);

};