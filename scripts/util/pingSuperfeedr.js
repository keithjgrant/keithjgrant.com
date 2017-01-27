var validTypes = ['posts', 'notes', 'replies', 'likes']

module.exports = function ping(type) {

  if (validTypes.indexOf(type) === -1) {
    console.error(`Unknown type, "${type}". Must be one of: ${validTypes}`);
    process.exit(0);
  }

  request.post(
    `http://keithjgrant.superfeedr.com/?hub.mode=publish&hub.url[]=http://keithjgrant.com&hub.url=http://keithjgrant.com/${type}`,
    function (error, response, body) {
      if (!error && response.statusCode == 204) {
        console.log("SuperFeedr ping successful")
      }
    }
  );
}
