const fs = require('fs');
const exec = require('child_process').exec;
const replace = require('replace');

const EDITOR = 'atom';

var replyToUrl = process.argv[2] || '';
var date = new Date();
var month = date.getMonth() + 1;
if (month < 10) {
  month = '0' + month;
}
var fileName = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
var path = `replies/${date.getFullYear()}/${month}/${fileName}.md`;

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
