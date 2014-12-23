var app = require('express')();

app.set('port', (process.env.PORT || 3000));

var http = require('http').Server(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
//  res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');

});

app.get('/app.css', function(req, res){
//  res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/app.css');

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

	socket.on('neighborhood select', function(msg){
		console.log('message2' + msg);
	    io.emit('neighborhood select', msg);
	  });

	socket.on('page-next', function(msg){
		console.log('page-next: ' + msg);
	    io.emit('page-next', msg);
	  });

	socket.on('page-today', function(msg){
		console.log('page-today: ' + msg);
	    io.emit('page-today', msg);
	  });

	socket.on('page-previous', function(msg){
		console.log('page-previous: ' + msg);
	    io.emit('page-previous', msg);
	  });
});

http.listen( (process.env.PORT || 3000), function(){
  console.log('listening on *:'+  (process.env.PORT || 3000) );
});

