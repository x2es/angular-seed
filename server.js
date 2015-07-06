// var PORT = 10203;

// var connect = require('connect');
// var serveStatic = require('serve-static');

// connect().use(serveStatic(__dirname)).listen(PORT);
// console.log('http server starting on port ' + PORT);

var BASE_PORT = 8080;

var portfinder = require('portfinder');
var express = require('express');
var app = express();

app
  .get('/*', function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
  })

  .use('/', express.static('app'))
  .use('/', express.static('app/page1'))               // optional
  .use('/bower', express.static('bower_components'))
  .use('/vendor', express.static('vendor'));
  

var server = null;

portfinder.basePort = BASE_PORT;
portfinder.getPort(function (err, port) {
  if (err) throw err;

  server = app.listen(port, function () {
    var address = server.address();
    console.log('[listen] [%s] http://%s:%s', address.family, address.address, address.port);
  });
});


