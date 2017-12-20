var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var authorize = require(`./helpers/authorize`);
var cookie = require('cookie');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authorize.authorize());


app.get('/', function (req, res) {
    console.log("get/");
    res.clearCookie("userName").sendFile(__dirname + "/index.html");
});

app.post('/login', function (req, res) {
    console.log("post/login");
    let usr= req.body.user;
    let psw= req.body.password;
    let cook = authorize.validLoginUser(usr, psw);
    if (cook){
        res.send(cook);
    };
});

app.get('/chat', function (req, res) {
    console.log("get/chat");
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {
    let cookiestr = cookie.parse(socket.request.headers.cookie)['userName'];
    let usr = authorize.validLoginCookie(cookiestr);

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });




    socket.on('chat message', function(msg){
        console.log(msg + usr);
        if (usr) io.emit('chat message', msg + "    |    " + usr);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});