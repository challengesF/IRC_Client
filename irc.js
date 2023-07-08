const { connect } = require('http2');
const net = require('net')

const server = 'irc.freenode.net';
const nick  = "ilabwoy";
const channel = "#mychannel";
const port = 6667;

const socket = net.createConnection(port, server)

socket.on('connect', ()=>{
    console.log('Connected to IRC server')
    SendCommand(`NICK ${nick}`)
    SendCommand(`USER ${nick} 0 * : ${nick}`)
})

socket.on('data', (data)=>{
    const message = data.toString().trim()
    console.log('Received data', message)
})

socket.on('close',()=>{
    console.log('Disconnected from IRC server')
})

socket.on('error', (error)=>{
    console.log(error)
})

SendCommand= (command)=>{
    console.log('Sending:', command);
    socket.write(`${command}\r\n`)
}

handleIncomingMessage = (data)=>{
    console.log('Received data', data)
}

socket.on('connect', ()=>{
    console.log('Connected to IRC server')
    SendCommand(`JOIN ${channel}`)
})

process.on('SIGINT', ()=>{
    SendCommand('QUIT')
    socket.end();
})