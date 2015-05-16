'use strict';

var gulp = require('gulp');

function imagesTask () {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('build/images'));
}

function cnameTask () {
  gulp.src('./src/CNAME')
    .pipe(gulp.dest('build'));
}

function faviconsTask () {
  gulp.src('./src/favicons/*')
    .pipe(gulp.dest('build'));
}

module.exports = {
  images: imagesTask,
  cname: cnameTask,
  favicons: faviconsTask
};
