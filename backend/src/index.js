import express from 'express'
import { WebSocketServer } from 'ws';
// import { Chess } from 'chess.js'
import http from 'http'
import { GameManager } from './GameManager.js';
import { log } from 'console';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const gameManager = new GameManager();


wss.on("connection", (socket) => {
    console.log("user connected");
    gameManager.addUser(socket)

    socket.on("close", () => {
        console.log('user disconnected');
        gameManager.removeUser(socket)
    })    
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});