// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require ('uuid/v1')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.user = "Anonymous"

//adds an id and sends a message to all connected clients
  const outgoingEvent = (data) => {
    data.id = uuidv1()
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

//sends a notification when a new user connects
  let connectionData = {
    content: "A new user has joined the chatroom",
    type: "incomingNotification",
    numberOfUsers: wss.clients.size,
  };
  outgoingEvent(connectionData)

//when a message is sent, sends it to all userss
  ws.on('message', (evt) => {
    let data = JSON.parse(evt)
    if(data.type === "postNotification") {
      data.type = "incomingNotification"
      data.content = data.content + data.newName
      ws.user = data.newName
      console.log("receiving name change notification")
    } else if (data.type === "postMessage") {
      data.type = "incomingMessage"
    }
    outgoingEvent(data)
  })

  // sends a message when a user leaves
  ws.on('close', () =>
    {
      connectionData.numberOfUsers = wss.clients.size
      connectionData.content = `${ws.user} has left the chatroom`
      outgoingEvent(connectionData)
      console.log('Client disconnected')
    });
});
