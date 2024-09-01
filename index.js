const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 9090 })

const clients = new Map()

server.on('connection', (socket) => {
	const id = Date.now()
	clients.set(id, socket)

	socket.on('message', (message) => {
		const data = JSON.parse(message)
		clients.forEach((client, clientId) => {
			if(clientId !== id) {
				client.send(JSON.stringify(data))
			}
		})
	})

	socket.on('close', () => {
		clients.delete(id)
	})
})

console.log('~Start')