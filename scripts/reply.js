const fs = require('fs');
const exec = require('child_process').exec;
const replace = require('replace');
const buildPath = require('./util/buildPath');

const EDITOR = 'atom';

var replyToUrl = process.argv[2] || '';

var path = buildPath('replies');

function createFile() {
  exec(`hugo new ${path}`, function () {
    setUrl();
    openEditor();
    console.log('After publishing, send webmentions using https://telegraph.p3k.io/dashboard');
    console.log(`Reply URL will be http://keithjgrant.com/${path}`)
  });
}

function setUrl() {
  replace({
    regex: "URL",
    replacement: replyToUrl,
    paths: [`content/${path}`],
    recursive: false,
    silent: true,
  });
}

function openEditor() {
  exec(`${EDITOR} content/${path}`);
}

createFile();
