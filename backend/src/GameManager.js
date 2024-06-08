import { Game } from "./Game";
import { INIT_GAME } from "./messages";

export class GameManager{
    games;
    pendingUser;
    users;

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = []
    }

    addUser(socket){
        this.users.push(socket)
        this.handleMessage(socket)
    }

    removeUser(socket){
        this.users = this.users.filter(user => user != socket)
    }

    handleMessage(socket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString())

            if(message.type === INIT_GAME){
                if (this.pendingUser){
                    //start game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game)
                    this.pendingUser = null
                }else {
                    this.pendingUser = socket
                }
            }

            if(message.type === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if(game){
                    game.makeMove(socket, message.move)
                }
            }
        })
    }
}