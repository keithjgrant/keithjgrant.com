'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    posts = require('./posts'),
    pages = require('../content/metadata/pages.json'),
    parser = require('./parser');

var POST_TEMPLATE = './src/jade/posts/_post.jade';

function jadeTask () {
  for (var i = 0; i < pages.length; i++) {
    renderPage(pages[i]);
  }
  for (var j = 0; j < posts.length; j++) {
    renderPost(posts[j]);
  }
}

function renderPost (post) {
  var dest = '.' + post.url,
      locals = { post: post }
  gulp.src(POST_TEMPLATE)
    .pipe(jade({locals: locals}))
    .pipe(rename(dest))
    .pipe(gulp.dest('./build'));
}

function renderPage (page) {
  var src = './content/pages/' + page + '.jade',
      context = getRelativeContext(page),
      dest = './' + page + '.html',
      locals = { posts: posts, pages: pages };
  gulp.src(src)
    .pipe(jade({
      locals: locals,
      parser: parser
    }))
    .pipe(rename(dest))
    .pipe(gulp.dest('./build'));
}

function getRelativeContext (path) {
  var numDirs = (path.match(/\//g) || []).length;
  var path = '../../'
  while (numDirs > 0) {
    path += '../';
    numDirs--;
  }
  return path + 'src/jade/temp.jade';
}


module.exports = jadeTask;
