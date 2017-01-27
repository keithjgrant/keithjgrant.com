const fs = require('fs');
const exec = require('child_process').exec;
const replace = require('replace');
const prompt = require('prompt');
const buildPath = require('./util/buildPath');
const publish = require('./util/publish');

const EDITOR = 'atom';

var content = process.argv[2] || '';

var path = buildPath('notes');

function createFile() {
  exec(`hugo new ${path}`, function () {
    setContent().then(function () {;
      console.log('After publishing, send webmentions using https://telegraph.p3k.io/dashboard');
      console.log(`Reply URL will be http://keithjgrant.com/${path}`)
    });
  });
}

function setContent() {
  return new Promise(function (resolve, reject) {
    replace({
      regex: "POST",
      replacement: content,
      paths: [`content/${path}`],
      recursive: false,
      silent: true,
    });
    publish('notes').then(function () {
      var url = encodeURIComponent(`http://keithjgrant.com/${path}`);
      exec(`open https://telegraph.p3k.io/dashboard/send?url=${url}`, function () {
        resolve();
      });
    });
  });
}

var dashes = new Array(Math.min(content.length + 1, 110)).join('-');
console.log(dashes);
console.log(content);
console.log(dashes);
console.log(`Note is ${content.length} characters long.`);

prompt.start();
prompt.get(['Proceed? [Y/n]'], function (err, result) {
  if (!err && result['Proceed? [Y/n]'] === 'Y') {
    createFile();
  } else {
    console.log('Aborted');
  }
});
