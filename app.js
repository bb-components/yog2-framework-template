/**
 * @file YOG2 框架启动入口
 * @author fis@baidu.com
 */

'use strict';

var yog = require('yog2-kernel');

var app = yog.bootstrap({
    rootPath: __dirname
}, function () {
    console.log('plugins load completed');
});

app.set('port', process.env.PORT || 8085);
app.disable('x-powered-by');

var server = yog.server = app.listen(app.get('port'), function () {
    console.log('Yog server listening on port ' + server.address().port);
});

server.on('connection', function (socket) {
    // disable nagle
    socket.setNoDelay(true);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
