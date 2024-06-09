import express from 'express'
import { WebSocketServer } from 'ws';
import { Chess } from 'chess.js'
import http from 'http'
import { GameManager } from './GameManager.js';

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server);

const wss = new WebSocketServer({port: 3000})

const gameManager = new GameManager();

const chess = new Chess();
let players = {};
let currentPlayer = "w";

// app.get("/", (req, res) => {
//     res.send("hello");
// });

wss.on("connection", (socket) => {
    gameManager.addUser(socket)
    socket.on("disconnect", () => gameManager.removeUser(socket))    
});

// server.listen(3000, () => {
//     console.log('server is running at port 3000');
// })