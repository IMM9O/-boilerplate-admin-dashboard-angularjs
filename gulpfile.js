'use strict';

var gulp = require('gulp');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-cssnano');
var minifyJs = require('gulp-uglify');
var minifyHTML = require('gulp-htmlmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rtlcss = require('gulp-rtlcss');
var notify = require("gulp-notify");

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var paths = {
    scripts: 'src/**/*.js',                              // javaScripts files
    templates: 'src/**/*.html',                          // html files
    main: 'src/index.html',                                // main files 
    styles: 'src/assets/sass/app.scss',                 // styles
    images: 'src/assets/img/**/*.*',                     // images
    fonts: 'node_modules/**/*.{ttf,woff,woff2,eof,svg}',             // font awsome
};


var dest = {
    dest: 'public',
    templates: 'public/templates',                               // html files
    css: 'public/css',                                           // css files
    scripts: 'public/js',                                        // javaScripts files
    images: 'public/assets/img',                                 // images
    fonts: 'public/assets/lib',                                 // fonts
};


// /******************************************************************************************************************************************/

// /**
//  * Handle bower node_modules ( vendor libraries ) from index.html css and js
//  */

// minfiy and concat all js , css file into one file define in index.html file
// destination and file name defined in index.html


gulp.task('usemin', function () {
    return gulp.src(paths.main)
        .pipe(usemin({
            js: ['concat'],
            css: [minifyCss({ keepSpecialComments: 0 }), 'concat'],
        }))
        .pipe(gulp.dest(dest.dest));
});

gulp.task('copy-fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('rtl-css', function () {
    return gulp.src('node_modules/**/*.css')
        .pipe(rtlcss())
        .pipe(gulp.dest('node_modules'))
});

gulp.task('build-vendors', ['usemin', 'copy-fonts']);

// /******************************************************************************************************************************************/


// /**
//  * Handle custome components 
//  */

/**Group task for custome files images , css , sass , html and javascript */
gulp.task('custom-styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({ keepSpecialComments: 0 }))
        .pipe(gulp.dest(dest.css))
        .pipe(notify("SASS are Compiled"));
});


gulp.task('custom-css', function () {
    return gulp.src(paths.css)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({ keepSpecialComments: 0 }))
        .pipe(gulp.dest(dest.css))
        .pipe(notify("css modified"));
});


gulp.task('custom-images', function () {

    return gulp.src(paths.images)
        .pipe(gulp.dest(dest.images))
        .pipe(notify("Images Moved"));

});

gulp.task('custom-templates', function () {
    var opts = { empty: true };
    return gulp.src(paths.templates)
        .pipe(rename(function (path) {
            path.dirname = '';
        }))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(dest.templates));

});


gulp.task('lint-code', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter());
});

gulp.task('lint-style', function () {
    return gulp.src(paths.scripts)
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(gulp.dest(paths.scripts));
});


gulp.task('lint', ['lint-code']);


gulp.task('custom-js', function () {

    return gulp.src(paths.scripts)
        .pipe(concat('app.min.js'))
        .pipe(minifyJs({
            outSourceMap: true
        }))
        .pipe(gulp.dest(dest.scripts))
        .pipe(notify("JS Files are Moved"));

});

gulp.task('build-custom', ['custom-images', 'custom-styles', 'custom-templates', 'lint', 'custom-js']);


// /**********************************************************************************************************************************************************/


gulp.task('watch', function () {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-styles']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.main], ['usemin']);
});



// browser sync yask
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    // browserSync.init({
    //     proxy: '127.0.0.1:8000',
    //     port: 8000,
    //     open: true,
    //     notify: false
    // });

    //watchFunction();
    gulp.watch(['public/**/*.*']).on('change', browserSync.reload);

});

gulp.task('build', ['build-vendors', 'build-custom']);
gulp.task('default', ['build', 'watch', 'browser-sync']);
