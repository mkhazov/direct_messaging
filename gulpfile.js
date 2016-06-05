'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

var config = {
     sassPath: './sass/**/*.scss',
     bowerDir: './bower_components' 
}

gulp.task('sass', function() {
    return gulp.src(config.sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// Sync css
gulp.task('sync-css', function () {
    gulp.src('css/*.css')
        .pipe(browserSync.stream());
});

// Sync js
gulp.task('sync-js', function () {
    gulp.src('js/**/*.js')
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./fonts'));
});

gulp.task('watch', function () {
    gulp.watch(config.sassPath, ['sass']);
    gulp.watch(['**/*.html']).on('change', browserSync.reload);
    gulp.watch(['css/*.css'], ['sync-css']);
    gulp.watch(['js/*.js'], ['sync-js']);
});

gulp.task('default', ['server', 'watch']);

gulp.task('server', ['sass', 'fonts'], function () {
    browserSync.init({
        server: {
            baseDir: "."
        },
        port: 3000,
        open: true,
        notify: false,
    });
});