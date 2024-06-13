import {Chess} from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from './messages.js';

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
        // this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "w"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "b"
            }
        }))
    }
    
    makeMove(socket, move){
        //right user is making a move
        if(this.moves.length % 2 === 0 && socket !== this.player1){
            return
        }
        if(this.moves.length % 2 === 1 && socket !== this.player2){
            return
        }
        
        try {
            this.board.move(move);
        } catch (error) {
            console.log(error);
            return
        }


        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === "w" ? "black" : "white" 
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === "w" ? "black" : "white" 
            }))
            return
        }

        if(this.moves.length % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }

        this.moves.push(move)
    }
}