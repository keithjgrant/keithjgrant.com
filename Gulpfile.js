'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var jadeVars = require('./src/jade-vars.json');

gulp.task('jade', function() {
  gulp.src('./src/jade/**/*.jade')
    .pipe(jade({
      locals: jadeVars
    }))
    .pipe(gulp.dest('.'))
});


gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('build', ['jade', 'sass']);
gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['build']);
});

gulp.task('default', ['build', 'watch']);
