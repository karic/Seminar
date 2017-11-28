var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var validUsers = [
    ["root", "toor"],
    ["nagib", "uzbrdica"],
    ["usr", "pw"]
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/chat', function (req, res) {

   if (req.body.user==="" && req.body.password===""){
    res.redirect(301, `/chat`);
    console.log("Good");
   } else{
       res.redirect(301, `/`);
       console.log("Bad");
   };
});
app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
