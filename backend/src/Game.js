export class Game {
    player1;
    player2;
    board;
    moves;
    startTime;

    constructor(player1, player2){
        this.player1 = player1
        this.player2 = player2
        this.board = ""
        this.moves = []
        this.startTime = new Date();

    }
    
    makeMove(socket, move){
        
    }
}