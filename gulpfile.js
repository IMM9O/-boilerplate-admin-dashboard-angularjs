'use strict';

var gulp = require('gulp');

var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var todo = require('gulp-todo');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var minifyCss = require('gulp-cssnano');
var minifyJs = require('gulp-uglify');
var minifyHTML = require('gulp-htmlmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


var paths = {
    scripts: 'app/**/*.js',                                   // javaScripts files
    templates: 'app/**/*.html',                               // html files
    main: 'app/index.html',                                              // main files 
    styles: 'app/assets/sass/main.scss',                                 // styles
    images: 'app/assets/img/**/*.*',                                     // images
    bower_fonts: 'node_modules/**/*.{ttf,woff,eof,svg}',             // font awsome
};


var dest = {
    scripts: 'public/js',                                         // javaScripts files
    templates: 'public',                                          // html files
    css: 'public/css',                                            // css files
    images: 'public/assets/img',                                  // images
    fonts: 'public/assets/lib' ,
};


// /******************************************************************************************************************************************/

// /**
//  * Handle bower node_modules ( vendor libraries ) from index.html css and js
//  */

// minfiy and concat all js , css file into one file define in index.html file
gulp.task('usemin', function() {
    return gulp.src(paths.main)
        .pipe(usemin({
            js: ['concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('public/'));
});

// copy all fonts into single folder 
gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('build-vendors', ['usemin','copy-bower_fonts']);

// /******************************************************************************************************************************************/


// /**
//  * Handle custome components 
//  */



// compile cass files into one css file then minify css  file  ( custome css )
gulp.task('custom-styles', function() {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(dest.css));
});

// move images files into dest folder
gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(dest.images));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(dest.templates));
});

// ESLint Task
gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(paths.scripts)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
        
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest(dest.scripts));
});



gulp.task('build-custom', ['custom-images', 'custom-styles' , 'custom-templates' , 'lint' , 'custom-js']);

// /***************************************************************************************************************************************************************/


// track all todo in files 
gulp.task('todo', function () {
    gulp.src(paths.scripts)
        .pipe(todo())
        .pipe(todo.reporter('json', { fileName: 'todo.json' }))
        .pipe(gulp.dest('./'));
});


gulp.task('quality', ['lint','todo']);





// /**********************************************************************************************************************************************************/


gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-styles']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.main], ['usemin']);
});

// browser sync yask
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    
    //watchFunction();
    gulp.watch(['public/**/*.*']).on('change', browserSync.reload);
    
});

gulp.task('build', ['build-vendors', 'build-custom']);
gulp.task('default', ['build', 'browser-sync', 'watch']);
