'use strict';

var gulp = require('gulp'),     
    sass = require('gulp-sass') ,
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    useref = require('gulp-useref'),
    clean = require('gulp-clean');

var config = {
     sassPath: './src/sass/**/*.scss',
     bowerDir: './src/bower_components' 
}

gulp.task('sass', function() {
    return gulp.src(config.sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

// Sync css
gulp.task('sync-css', function () {
    gulp.src('src/css/*.css')
        .pipe(browserSync.stream());
});

// Sync js
gulp.task('sync-js', function () {
    gulp.src('src/js/*.js')
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./src/fonts'));
});

gulp.task('watch', function () {
    gulp.watch(config.sassPath, ['sass']);
    gulp.watch(['src/index.html']).on('change', reload);
    gulp.watch(['src/css/*.css'], ['sync-css']);
    gulp.watch(['src/js/*.js'], ['sync-js']);
});

/**
 * ==================================================
 * Build
 * ==================================================
 */

gulp.task('copy_fonts', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./build/fonts'));
});

// Предварительная очистка build/
gulp.task('clean', function () {
    return gulp.src('build')
        .pipe(clean());
});

// Перенос .css и .js файлов в build/
gulp.task('useref', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('build'));
});

gulp.task('copy_images', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('copyFiles', ['sass', 'useref', 'copy_fonts', 'copy_images'], function() {

});

// Собираем папку build
gulp.task('build', ['clean'], function () {
    gulp.start('copyFiles');
});

gulp.task('default', ['server', 'watch']);

// Запуск сервера
gulp.task('server', ['sass', 'fonts'], function () {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        port: 3000,
        open: true,
        notify: false,
    });
});