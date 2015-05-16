'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    posts = require('./posts'),
    pages = require('../src/pages.json');

var POST_TEMPLATE = './src/jade/posts/_post.jade';

function jadeTask () {
  for (var i = 0; i < posts.length; i++) {
    renderPost(posts[i]);
  }
  for (var j = 0; j < pages.length; j++) {
    renderPage(pages[j]);
  }
}

function renderPost (post) {
  gulpRender(
    POST_TEMPLATE,
    '.' + post.url,
    { post: post }
  );
}

function renderPage (page) {
  gulpRender(
    './src/jade/' + page + '.jade',
    './' + page + '.html',
    { posts: posts, pages: pages }
  );
}

function gulpRender (src, dest, locals) {
  gulp.src(src)
    .pipe(jade({locals: locals}))
    .pipe(rename(dest))
    .pipe(gulp.dest('./build'));
}


module.exports = jadeTask;
