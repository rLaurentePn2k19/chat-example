var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4500;

io.sockets.on('connection', function (socket) {
    socket.on('sendMessage', function (data) {
    socket.broadcast.emit('message', data);
    socket.emit('message', { text: data.text });   
    });   
});

http.listen(port, function(){
    console.log('Listening on *:' + port);
  });
  