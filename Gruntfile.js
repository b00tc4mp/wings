module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    var dir = {
        src: 'src',
        rel: 'dist/<%= pkg.name %>',
        dist: 'dist'
    };

    grunt
        .initConfig({

            pkg: grunt.file.readJSON('package.json'),

            jshint: {
                options: {
                    laxbreak: true,
                    '-W093': true,
                    '-W030': true,
                    '-W083': true,
                    '-W061': true
                },
                all: ['Gruntfile.js', dir.src + '/**/*.js']
            },

            clean: [dir.dist],

            'string-replace': {
                inline: {
                    files: [{
                        expand: true,
                        cwd: dir.src,
                        src: '<%= pkg.shortname %>.js',
                        dest: dir.rel
                    }, {
                        expand: true,
                        cwd: dir.src,
                        src: 'index.html',
                        dest: dir.rel
                    }],
                    options: {
                        replacements: [{
                            pattern: '<%= pkg.shortname %>.js',
                            replacement: '<%= pkg.shortname %>-<%= pkg.version %>.min.js'
                        }, {
                            pattern: /_titl/g,
                            replacement: '<%= pkg.title %>'
                        }, {
                            pattern: /_desc/g,
                            replacement: '<%= pkg.description %>'
                        }, {
                            pattern: /_ver/g,
                            replacement: '<%= pkg.version %>'
                        }, {
                            pattern: /_auth/g,
                            replacement: '<%= pkg.author %>'
                        }, {
                            pattern: /_nam/g,
                            replacement: '<%= pkg.shortname %>'
                        }]
                    }
                }
            },

            rename: {
                main: {
                    files: [{
                        src: [dir.rel + '/<%= pkg.shortname %>.js'],
                        dest: dir.rel +
                            '/<%= pkg.shortname %>-<%= pkg.version %>.js'
                    }, ]
                }
            },

            uglify: {
                options: {
                    banner: '/*! <%= pkg.title %> <%= pkg.version %> */'
                },
                build: {
                    src: dir.rel +
                        '/<%= pkg.shortname %>-<%= pkg.version %>.js',
                    dest: dir.rel +
                        '/<%= pkg.shortname %>-<%= pkg.version %>.min.js'
                }
            },

            copy: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: dir.src,
                        src: ['favicon.ico', 'logo.svg', 'main.js',
                            'scripts/**', 'fonts/*', 'images/*'
                        ],
                        dest: dir.rel
                    }]
                }
            },

            sass: {
                main: {
                    files: [{
                        expand: true,
                        cwd: dir.src + '/styles',
                        src: ['main.scss'],
                        dest: dir.rel + '/styles',
                        ext: '.css'
                    }]
                }
            },

            watch: {
                main: {
                    files: ['Gruntfile.js', dir.src + '/**'],
                    tasks: ['default'],
                    options: {
                        livereload: true
                    }
                }
            },

            connect: {
                dist: {
                    options: {
                        port: 9001,
                        base: dir.rel,
                        livereload: true
                    }
                }
            },

            jsbeautifier: {
                files: ['src/**/*.js', '*.js*'],
                options: {}
            }

        });

    grunt.registerTask('default', ['jsbeautifier', 'clean', 'jshint', 'string-replace',
        'rename', 'uglify', 'copy', 'sass'
    ]);

    grunt.registerTask('serve', ['default', 'connect', 'watch']);

};
