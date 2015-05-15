'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var open = require('gulp-open');
var shell = require('gulp-shell');
var del = require('del');
var jadeVars = require('./src/jade-vars.json');

var PORT_NUM = 4242;

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
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});
gulp.task('sass:verbose', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    root: ['build'],
    port: PORT_NUM,
    livereload: true
  });
});

gulp.task('open', function(){
  gulp.src('./build/index.html')
    .pipe(open('', {
      url: 'http://localhost:' + PORT_NUM,
      app: 'google chrome'
    }));
});

gulp.task('deploy', shell.task([
  'git subtree push --prefix build origin gh-pages'
]));

gulp.task('watch', ['connect'], function () {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('build', ['copy:images', 'jade', 'sass:verbose']);

gulp.task('default', ['build', 'connect', 'watch', 'open']);
