import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";

export class GameManager{
    games;
    pendingUser;
    users;

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = []
    }

    addUser(user){
        this.users.push(user)
        this.handleMessage(user)
    }

    removeUser(socket){
        this.users = this.users.filter(user => user != socket)
    }

    handleMessage(user){
        user.socket.on("message", (data) => {
            const message = JSON.parse(data.toString())

            if(message.type === INIT_GAME){
                if (this.pendingUser){
                    //start game
                    const game = new Game(this.pendingUser, user);
                    this.games.push(game)
                    game.getPlayersInfo()
                    this.pendingUser = null
                }else {
                    this.pendingUser = user
                }
            }

            if(message.type === MOVE){
                const game = this.games.find(game => game.player1.socket === user.socket || game.player2.socket === user.socket)
                if(game){
                    game.makeMove(user.socket, message.payload)
                }
            }
        })
    }
}