import {Chess} from 'chess.js'
import { GAME_ENDED, GAME_OVER, INIT_GAME, MOVE } from './messages.js';
import prisma from './db/index.js';

export class Game {
    player1;
    player2;
    board;
    moves;
    // startTime;

    constructor(player1, player2){
        this.player1 = player1
        this.player2 = player2
        this.board = new Chess()
        this.moves = []
        
    }

    async getPlayersInfo(){
        const users = await prisma.user.findMany({
            where: {
              id: {
                in: [this.player1.userId, this.player2.userId ?? ''],
              },
            },
          });

        this.player1.socket.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "w",
                whitePlayer: {
                    name: users.find((user) => user.id === this.player1.userId)?.name,
                    id: this.player1.userId,
                  },
                blackPlayer: {
                    name: users.find((user) => user.id === this.player2.userId)?.name,
                    id: this.player2.userId,
                  }
            }
        }))
        this.player2.socket.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "b",
                whitePlayer: {
                    name: users.find((user) => user.id === this.player1.userId)?.name,
                    id: this.player1.userId,
                  },
                blackPlayer: {
                    name: users.find((user) => user.id === this.player2.userId)?.name,
                    id: this.player2.userId,
                  }
            }
        }))
    }
    
    makeMove(socket, move){
        //right user is making a move
        if(this.moves.length % 2 === 0 && socket !== this.player1.socket){
            return
        }
        if(this.moves.length % 2 === 1 && socket !== this.player2.socket){
            return
        }
        
        try {
            this.board.move(move);
        } catch (error) {
            console.log(error);
            return
        }


        if(this.board.isGameOver()){
            const result = this.board.isDraw() ? "DRAW" : this.board.turn() === "w" ? "Black Wins" : "White Wins" 
            
            // this.player1.socket.send(JSON.stringify({
            //     type: GAME_OVER,
            //     payload:  result
            // }))
            // this.player2.socket.send(JSON.stringify({
            //     type: GAME_OVER,
            //     payload: result 
            // }))
            this.endGame("COMPLETED", result)
            return
        }

        if(this.moves.length % 2 === 0){
            this.player2.socket.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {
            this.player1.socket.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moves.push(move)
    }

    endGame(status, result){
        this.player1.socket.send(JSON.stringify({
            type: GAME_ENDED,
            payload: {
                result,
                status,
              },
        }))
        this.player2.socket.send(JSON.stringify({
            type: GAME_ENDED,
            payload: {
                result,
                status,
              },
        }))
    }
}