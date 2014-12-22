var app = require('express')();

app.set('port', (process.env.PORT || 5000));

var http = require('http').Server(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
//  res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');

});

io.on('connection', function(socket){
  console.log('a user connected');

	socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });

	socket.on('chat message', function(msg){
				console.log('message' + msg);

	    io.emit('chat message', msg);
	  });

	socket.on('chat message2', function(msg){
		console.log('message2' + msg);
	    io.emit('chat message2', msg);
	  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

