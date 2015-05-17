'use strict';

var gulp = require('gulp');

function copyTask () {
  gulp.src('./content/static/**/*')
    .pipe(gulp.dest('build'));
}

module.exports = copyTask;
