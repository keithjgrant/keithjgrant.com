'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    posts = require('./posts'),
    pages = require('../content/metadata/pages.json');

function rssTask () {
  var locals = {
    title: 'Keith J Grant',
    url: 'http://keithjgrant.com',
    feedUrl: 'http://keithjgrant.com/feed.xml',
    description: 'JavaScript, CSS, UX, and the open web',
    language: 'en-US',
    posts: posts,
  };
  gulp.src('./src/rss.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(rename('./feed.xml'))
    .pipe(gulp.dest('./build'));
}


module.exports = rssTask;
