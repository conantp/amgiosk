var express = require('express');
var app = express();

var path = require('path');


app.set('port', (process.env.PORT || 3000));

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/img',express.static(path.join(__dirname, 'img')));
app.use('/js',express.static(path.join(__dirname, 'js')));
app.use('/styles',express.static(path.join(__dirname, 'styles')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/kiosk', function(req, res){
  res.sendFile(__dirname + '/html/kiosk.html');
});

app.get('/app.css', function(req, res){
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


	socket.on('page-up', function(msg){
		console.log('page-up: ' + msg);
	    io.emit('page-up', msg);
	  });

	socket.on('page-down', function(msg){
		console.log('page-down: ' + msg);
	    io.emit('page-down', msg);
	  });

	socket.on('featured show', function(msg){
		console.log('featured show: ' + msg);
	    io.emit('featured show', msg);
	  });

	socket.on('active slide', function(msg){
		console.log('active slide: ' + msg);
	    io.emit('active slide', msg);
	  });

socket.on('venue show next', function(msg){
		console.log('venue show next ' + msg);
	    io.emit('venue show next', msg);
	  });

socket.on('venue show previous', function(msg){
		console.log('venue show previous: ' + msg);
	    io.emit('venue show previous', msg);
	  });

socket.on('venue detail', function(msg){
		console.log('venue detail: ' + msg);
	    io.emit('venue detail', msg);
	  });

socket.on('get current slide', function(msg){
		console.log('request for current slide: ' + msg);
	    io.emit('get current slide', msg);
	  });

	socket.on('change module', function(msg){
		console.log('change module: ' + msg);
	    io.emit('change module', msg);
	  });




	
});

http.listen( (process.env.PORT || 3000), function(){
  console.log('listening on *:'+  (process.env.PORT || 3000) );
});

