import { Game } from "./Game.js";
import { GAME_ALERT, INIT_GAME, MOVE, OPPONENT_DISCONNECTED } from "./messages.js";

export class GameManager {
  games;
  pendingUser;

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    this.handleMessage(user);
  }

  removeUser(socket) {
        const game = this.games.find(game => game.player1.socket === socket || game.player2.socket === socket);
        if (game) {
        // const remainingPlayer = game.player1.socket === socket ? game.player2 : game.player1;
        const result = game.player1.socket === socket ? "Black Wins" : "White Wins";

        // remainingPlayer.socket.send(JSON.stringify({
        //     type: OPPONENT_DISCONNECTED,
        //     payload: "Your opponent has disconnected. You win by default."
        // }));
        game.endGame("OPPONENT_DISCONNECTED", result)

        this.games = this.games.filter(g => g !== game);
        this.pendingUser = null
        }
    }

  handleMessage(user) {
    user.socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          //start game
          if (user.userId === this.pendingUser.userId) {
            user.socket.send(
              JSON.stringify({
                type: GAME_ALERT,
                payload: "Trying to connect with yourself?",
              })
            );
            this.pendingUser = null;
          } else {
            const game = new Game(this.pendingUser, user);
            this.games.push(game);
            game.getPlayersInfo();
            this.pendingUser = null;
          }
        } else {
          this.pendingUser = user;
          //send GAME_ADDED message such that it can be used to wait for opponent 
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          (game) =>
            game.player1.socket === user.socket ||
            game.player2.socket === user.socket
        );
        if (game) {
          game.makeMove(user.socket, message.payload);
        }
      }
    });
  }
}
