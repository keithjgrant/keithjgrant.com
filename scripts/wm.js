const webmention = require('send-webmention');
// var concat = require('concat-stream');

if (process.argv.length < 3) {
  console.log('Send a webmention');
  console.log('');
  console.log('Usage: node ./wm.js <source> <target>');
  console.log('');
  console.log('<source> is your url, which links to <target>');
} else {
  const target = process.argv.pop();
  const source = process.argv.pop();

  console.log(process.argv.pop());
  webmention(
    {
      source: source,
      target: target,
      ua: 'webmention-5000/1.0.0',
    },
    function(err, obj) {
      if (err) {
        throw err;
      }
      if (obj.success) {
        obj.res.pipe(function(buf) {
          console.log('Success! Got back response:', buf.toString());
        });
      } else {
        console.log('Failure :(');
      }
    }
  );
}
