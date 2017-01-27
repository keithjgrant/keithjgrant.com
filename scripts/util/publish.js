const exec = require('child_process').exec;
const ping = require('./pingSuperfeedr');

var validTypes = ['posts', 'notes', 'replies', 'likes']

module.exports = function publish(type) {
  return new Promise(function (resolve, reject) {
    if (validTypes.indexOf(type) === -1) {
      console.error(`Unknown type, "${type}". Must be one of: ${validTypes}`);
      return reject();
    }

    exec(`hugo -d docs && git add content/${type} docs/${type} && git commit -m "note" && git push`, function () {
      setTimeout(function () {
        // ping(type);
        resolve();
      }, 1000);
    });
  });
};
