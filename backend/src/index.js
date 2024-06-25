import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { GameManager } from "./GameManager.js";
import session from 'express-session';
import { initPassport } from "./passport.js";
import userRouter from "./routes/auth.js";
import passport from "passport";
import cors from "cors"
import url from 'url'
import { User } from "./SocketManager.js";
import jwt from 'jsonwebtoken'

const app = express();
const server = http.createServer(app);
const JWT_SECRET = process.env.JWT_SECRET
const wss = new WebSocketServer({ server });

const gameManager = new GameManager();

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

initPassport();
app.use(passport.initialize());
app.use(passport.authenticate("session"));

wss.on("connection", (socket, req) => {
  // console.log("user connected");
  const token = url.parse(req.url, true).query.token;
  if (!token) {
    socket.close();
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      socket.close();
      return;
    }

    const userId = decoded.userId;
    console.log('Authenticated user:', userId);

    gameManager.addUser(new User(socket, userId));

    socket.on('disconnect', () => {
      gameManager.removeUser(socket);
    });
  });
  socket.on("disconnect", () => {
    // console.log("user disconnected");
    gameManager.removeUser(socket);
  });
});

app.use(
  cors({
    origin: 'http://localhost:5173', // Your client's origin
    credentials: true, // Allow credentials
  })
)
app.use('/auth', userRouter)

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
