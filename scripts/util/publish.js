const exec = require('child_process').exec;
const ping = require('./pingSuperfeedr');

var validTypes = ['posts', 'notes', 'replies', 'likes']

module.exports = function publish(type) {
  if (validTypes.indexOf(type) === -1) {
    console.error(`Unknown type, "${type}". Must be one of: ${validTypes}`);
    process.exit(0);
  }
  
  exec(`hugo -d docs && git commit -a content/${type} docs/${type} -m "note" && git push`, function () {
    setTimeout(function () {
      ping(type);
    }, 1000);
  });
};
