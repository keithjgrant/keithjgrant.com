
module.exports = function buildPath(prefix) {
  var date = new Date();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var fileName = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  return `${prefix}/${date.getFullYear()}/${month}/${fileName}.md`;
}
