'use strict';

var postData = require('../content/metadata/posts.json'),
    jade = require('jade'),
    months = ['January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'],
    posts = [];

function compilePosts () {
  for (var i = 0; i < postData.length; i++) {
    posts.push(fillPostData(postData[i]));
  };
  posts.sort(dateSort);
  return posts;
}

function fillPostData (post) {
  if (!post.slug) {
    post.slug = urlify(post.title);
  }
  post.url = '/posts/' + post.slug + '.html'
  post.formattedDate = formatDate(post.date);
  post.getContent = getPostContent.bind(null, post.slug);
  return post;
}

function urlify (title) {
  return title.replace(/\ /g, '-').toLowerCase();
}

function formatDate (dateStr) {
  var date = new Date(dateStr);
  console.log(dateStr);
  console.log(date);
  console.log(date.getDate());
  return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

function getPostContent (slug) {
  var src = 'content/posts/' + slug + '.jade';
  return jade.renderFile(src, {});
}

function dateSort (a, b) {
  if (a.date === b.date) {
    return 1; // maintains key order
  } else {
    return new Date(b.date) - new Date(a.date);
  }
}


module.exports = compilePosts();
