var request = require('request');

request.post(
  'http://keithjgrant.superfeedr.com/',
  {
    json: {
      "hub.mode": "publish",
      "hub.url": "http://keithjgrant.com/index.xml",
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode == 204) {
      console.log("SuperFeedr ping successful")
    }
  }
);
