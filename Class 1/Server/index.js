const net = require('net');
const server = net.createServer((socket) => {
    socket.on('connection', (socket)=>{
        console.log('Connected');
    }).on('data', (data)=>{
        console.log(data.toString());
    })
}).on('error', (err) => {
    // handle errors here
    throw err;
}).on('connection', (socket)=>{
    console.log('Dosla');
}); //delete .end to prevent sockets closing from server side
// grab an arbitrary unused port.
server.listen({
    port:8080
},
() => {
    console.log('opened server on', server.address());
});

//Use .on('data',) on socket not on server, because only sockets support that event