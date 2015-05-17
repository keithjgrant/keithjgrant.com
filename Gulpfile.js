'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var shell = require('gulp-shell');
var rss = require('gulp-rss');
var jadeTask = require('./lib/jadeTask');
var sassTask = require('./lib/sassTask');
var copyTask = require('./lib/copyTask');
var del = require('del');

var PORT_NUM = 4242;

gulp.task('clean', function (done) {
  del('./build/**/*', done);
});

gulp.task('jade', jadeTask);

gulp.task('sass', sassTask);

gulp.task('rss', function () {

});

gulp.task('copy', copyTask);

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
  'git push',
  'git subtree push --prefix build origin gh-pages'
]));

gulp.task('watch', ['connect'], function () {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('build', ['copy', 'jade', 'sass']);

gulp.task('default', ['build', 'connect', 'watch', 'open']);
