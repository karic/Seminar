const net = require('net');
var clients = [];
const server = net.createServer((socket) => {


    socket
        .on('data', (data) => {
        console.log(data.toString());
        for (let i = 0; i<clients.length; i++) {
            if(i !== clients.indexOf(socket))
            clients[i].write(data);
        }
    })
        .on('close', (socket) => {
        console.log('### Closed');
        clients.splice(clients.indexOf(socket), 1);
         console.log(`### Current online clients: ${clients.length}`);
    })
        .on('error', (err) => {
        // handle errors here
        throw err;
    })


});

    server.on('connection', (socket)=>{
        clients.push(socket); //On connection
        console.log('### Connected');
        console.log(`### Current online clients: ${clients.length}`);
});


server.listen({
        port: 8080
    },
    () => {
        console.log('opened server on', server.address());
    });

//Use .on('data',) on socket not on server, because only sockets support that event