'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var jadeVars = require('./src/jade-vars.json');

gulp.task('clean', function (done) {
  del('./build/**/*', done);
});

gulp.task('copy:images', function () {
  gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('build/images'));
});

gulp.task('jade', function () {
  gulp.src('./src/jade/**/*.jade')
    .pipe(jade({
      locals: jadeVars
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('sass', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('build', ['clean', 'copy:images', 'jade', 'sass']);

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);
