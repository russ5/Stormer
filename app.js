var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var chat = io.of('/chat');
const shortid = require('shortid');
var url;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/url', function(req, res){
    url = shortid.generate();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url: url }));
    app.get('/'+ url, function(req, res){
        res.sendFile(__dirname + '/chat.html');
    });
});

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

chat.on('connection', function(socket){
    socket.on('chat message', function(msg){
        chat.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});