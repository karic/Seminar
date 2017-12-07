var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

let crypto = require('crypto');
let Buffer = require('buffer').Buffer;
let SECRET_KEY = "NekiBasTajan123dsa1234";
let ENCODING = 'hex';

function encrypt(text) {
    let cipher = crypto.createCipher('des-ede3-cbc', SECRET_KEY);
    let retVal = cipher.update(text, 'utf8', ENCODING);
    retVal+= cipher.final(ENCODING);
    console.log("Crypted Text: ", retVal);
    return  retVal;
}

function decrypt(text) {

    let decipher = crypto.createDecipher('des-ede3-cbc', SECRET_KEY);
    let retVal = decipher.update(text, 'utf8', ENCODING);
    retVal+= decipher.final(ENCODING);
    console.log("Decrypted Text: ", retVal);
    return  retVal;

}

var validUsers = [
    ["root", "toor"],
    ["nagib", "uzbrdica"],
    ["usr", "pw"]
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.clearCookie('userName','').sendFile(__dirname + '/index.html');
});
app.post('/chat', function (req, res) {
    let usr= req.body.user;
    let psw= req.body.password;
    if (usr==="root" && psw==="toor"){
       res.cookie('userName', encrypt(usr)).redirect(301, `/chat`);
    console.log("Good");
   } else{
       res.redirect(301, `/`);
       console.log("Bad");
   };
});
app.get('/chat', function (req, res) {
    if (decrypt(req.cookies['userName'])=="root") {
        res.sendFile(__dirname + '/chat.html');
    } else {
        res.redirect(301, `/`);
    }
});


io.on('connection', function (socket) {
    console.log('a user connected');
    let userN = socket.handshake.headers.cookie.split(' ');
    let index=-1;
    for (var i=0; i<userN.length;i++){
     if(userN[i].search("userName")!=-1){

        index = i;
     }
    };
    var cookieUsr = userN[i-1];
    cookieUsr = cookieUsr.substring(cookieUsr.indexOf('=')+1);
    cookieUsr = decrypt(cookieUsr);
    //Hacky implementation don't do it this way

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });




    socket.on('chat message', function(msg){
        console.log(msg + cookieUsr);
        io.emit('chat message', msg + cookieUsr);
});
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
