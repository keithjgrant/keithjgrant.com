'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var open = require('gulp-open');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var jadeRender = require('jade');
var del = require('del');
var posts = require('./src/posts.json');
var pages = require('./src/pages.json');

var PORT_NUM = 4242;

var jadeVars = {
  posts: posts
};

gulp.task('clean', function (done) {
  del('./build/**/*', done);
});

gulp.task('copy:images', function () {
  gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('build/images'));
});

function urlify (title) {
  return title.replace(' ', '-').toLowerCase();
}

function renderPage (src, dest, locals) {
  gulp.src(src)
    .pipe(jade({locals: locals}))
    .pipe(rename(dest))
    .pipe(gulp.dest('./build'));
}

function getPostContent (slug) {
  var src = 'src/jade/posts/' + slug + '.jade';
  return jadeRender.renderFile(src, {});
}

function fillPost (post) {
  if (!post.slug) {
    post.slug = urlify(post.title);
  }
  post.url = '/posts/' + post.slug + '.html'
  return post;
}

var months = ['January', 'February', 'March',
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];
function formatDate (dateStr) {
  var date = new Date(dateStr);
  return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

gulp.task('jade', function () {
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i],
        src = './src/jade/' + page + '.jade',
        dest = './' + page + '.html',
        locals = {
          posts: posts,
          pages: pages,
          getPostContent: getPostContent,
          formatDate: formatDate
        };
    renderPage(src, dest, locals);
  };
  for (var j = 0; j < posts.length; j++) {
    var post = fillPost(posts[j]),
        src = './src/jade/posts/_post.jade',
        dest = '.' + post.url
        locals = {
          post: post,
          getPostContent: getPostContent,
          formatDate: formatDate
        }
    renderPage(src, dest, locals);
  };
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
  'git push',
  'git subtree push --prefix build origin gh-pages'
]));

gulp.task('watch', ['connect'], function () {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('build', ['copy:images', 'jade', 'sass:verbose']);

gulp.task('default', ['build', 'connect', 'watch', 'open']);
