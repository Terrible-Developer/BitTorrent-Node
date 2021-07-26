class Pieces {
    constructor(size){
        this.requested = new Array(size).fill(false);
        this.received = new Array(size).fill(false);
    };

    addRequested(pieceIndex){
        this.requested[pieceIndex] = true;
    };

    addReceived(pieceIndex){
        this.requested[pieceIndex] = true;
    };

    needed(pieceIndex){
        if(this.requested.every(i => i === true)){
            this.requested = this.received.slice();
        }
        return !this.requested[pieceIndex];
    };

    isDone(){
        return this.received.every(i => i === true);
    };
}

export{
    Pieces
}
