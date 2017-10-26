const net = require('net');
const readline = require('readline');

const socket = net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


socket
        .connect({
    port:8080,
    host:'localhost'
    }, ()=>{
        console.log('Connected.');
    })
        .on('connect', ()=>{
        console.log('Connected event.');
        msg();
    })
        .on('data', (data)=>{
        console.log( data.toString());
    })
        .on('close', ()=>{
    console.log('zatvoren');
});




function msg() {
    rl.question("~", (answer) => {
        if (answer !== 'exit') {
            socket.write(answer);
            msg();
        } else {
            socket.end();
            rl.close();
        }
    });
}