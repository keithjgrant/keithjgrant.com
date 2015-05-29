'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var shell = require('gulp-shell');
var jadeTask = require('./src/jadeTask');
var sassTask = require('./src/sassTask');
var copyTask = require('./src/copyTask');
var rssTask = require('./src/rssTask');
var del = require('del');

var PORT_NUM = 4242;

gulp.task('clean', function (done) {
  del('./build/**/*', done);
});

gulp.task('jade', jadeTask);

gulp.task('sass', sassTask);

gulp.task('copy', copyTask);

gulp.task('rss', rssTask);

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
  gulp.watch(['./content/**/*', './theme/**/*'], ['build']);
});

gulp.task('build', ['copy', 'jade', 'sass', 'rss']);

gulp.task('default', ['build', 'connect', 'watch', 'open']);
