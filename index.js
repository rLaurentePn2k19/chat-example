var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4500;

var list_users = {};

http.listen(port, function(){
  console.log('Listening on *:' + port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('set_username', (function(data){
    socket.username = data.username;
    if(!list_users.hasOwnProperty(data)){
      socket.username = data.username;
      list_users[socket.username] = { active : true };
      console.log('a user connected ' + socket.username);
      io.sockets.emit('set_username', list_users);
      console.log(list_users);
    }
  }))
  socket.on('disconnect', function(){
    if(!socket.username) {
      return;
    }
    list_users[socket.username].active = false;
    io.sockets.emit('set_username', list_users);
    console.log('user disconnected '+ socket.username);
    let used = socket.username;
    delete list_users[used];
    console.log(list_users);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('typing', function () {
    socket.broadcast.emit('typing', { username: socket.username })
    })
});

