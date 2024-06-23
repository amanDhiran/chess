import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { GameManager } from "./GameManager.js";
import session from 'express-session';
import { initPassport } from "./passport.js";
import userRouter from "./routes/auth.js";
import passport from "passport";

const app = express();
const server = http.createServer(app);

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

wss.on("connection", (socket) => {
  console.log("user connected");
  gameManager.addUser(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    gameManager.removeUser(socket);
  });
});

app.use('/auth', userRouter)

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
