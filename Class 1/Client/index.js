const net = require('net');

const socket = net.Socket();
socket.setKeepAlive(5000);
socket.setTimeout(3000);

socket.connect({
    port:8080,
    host:'localhost'
    }, ()=>{
        console.log('Connected.');
        socket.write('Sent without connection confirmed.');
        console.log('test');
    }).on('connect', ()=>{
        console.log('Connected event.');
        socket.write('Sent with connect event.');
    }).on('timeout', ()=>{
        console.log('Timeout event.');
        var date = new Date();
        socket.write(date.getHours().toString()+":" + date.getMinutes().toString()+":"+date.getSeconds().toString()); 
    });
