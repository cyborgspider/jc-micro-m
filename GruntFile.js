module.exports =function(grunt){
     //Configure your tasks
     //matchdep reduces repetitive code by utilizing the package.json file to loadNpmTasks
     require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
     grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),//load properties from the package as a JSON object
      watch: {
        options:{
          livereload: true
        },
        js: {
          files:   ['site/scripts/*.coffee'],
          tasks:   ['coffee','uglify']
        },
        css:{
          files:   ['site/styles/*.styl'],
          tasks:   ['stylus']
        },
        html:{
          files:   ['site/*.jade', 'site/inc/*'],
          tasks:   ['jade']
        }
      },
      coffee:{
        compile: {
            files: {
              'build/js/scripts.js': ['site/scripts/*.coffee'] // compile and concat into single file
            }
          }
      },
      uglify: {
        my_target: {
          files: {
            'build/js/scripts.min.js': ['build/js/scripts.js']
          }
        }
      },
      copy: {
        main: {
          files: [
            {expand: true, cwd: 'site/images', src: '*', dest: 'build/img'},
            {expand: true, cwd: 'site/lib/css', src: '*', dest: 'build/css'},
            {expand: true, cwd: 'site/lib/js', src: '*', dest: 'build/js'},
            {expand: true, cwd: 'site/video', src: '*', dest: 'build/vid'},
            {expand: true, cwd: 'site/php', src: '*', dest: 'build/php'}
          ]
        },
      },
      stylus:{
        compile: {
          options:{
            import:['nib']
          },
          files: {
            'build/css/styles.css': ['site/styles/styles.styl'] // compile and concat into single file
          }
        }

      },
      jade:{
        compile:{
          options: {pretty:true},
          files:[{
            expand: true,
            cwd:    'site/',
            src:    "*.jade",
            ext:    ".html",
            dest:   "build/"
          }]
        }
      }
     });

     //Run the task
     grunt.registerTask('default', ['watch','coffee', 'uglify', 'stylus', 'jade', 'copy']);
     grunt.registerTask('build', ['coffee', 'uglify', 'stylus','jade', 'copy']);
};
