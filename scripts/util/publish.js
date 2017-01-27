const exec = require('child_process').exec;
const ping = require('./pingSuperfeedr');

module.exports = function publish(type) {
  exec(`hugo -d docs && git commit -a content/${type} docs/${type} -m "note" && git push`, function () {
    setTimeout(function () {
      ping(type);
    }, 1000);
  });
};
