const socketIO = require('socket.io')
const socket = {}

function connect(server) {
   socket.io = socketIO(server)
   socket.io.on('connection', (s)=>{
       const idSala = s.handshake.query.id
       console.log(idSala)
       s.join(idSala)
    })

}

module.exports={
    connect,
    socket
}