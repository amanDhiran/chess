export class User{
    socket;
    userId

    constructor(socket, userId){
        this.socket = socket,
        this.userId = userId
    }
}