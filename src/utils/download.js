import net from 'net';
import { Buffer } from 'buffer';
import { getPeers } from './tracker.js';
import { parseMsg, buildRequest } from './message.js';

const downloadTorrent = torrent => {
    const requested = [];
    getPeers(torrent, peers => {
        peers.forEach(peer => download(peer, torrent, requested));
    });
};

const download = (peer, torrent, requested) => {
    const queue = [];
    const socket = net.Socket();
    socket.on('error', console.log);
    socket.connect(peer.port, peer.ip, () => {
        //write message
    });
    onWholeMsg(socket, msg => msgHandler(msg, socket, requested, queue));
    //socket.on('data', data => {
    //    //handle response
    //});
};

const onWholeMsg(socket, callback){
    let savedBuffer = Buffer.alloc(0);
    let handshake = true;

    socket.on('data', receivedBuffer => {
        const msgLen = () => handshake ? savedBuffer.readUInt8(0) + 49 : savedBuffer.readInt32BE(0) + 4; //calculate length of message
        savedBuffer = Buffer.concat([savedBuffer, receivedBuffer]);

        while(savedBuffer.length >= 4 && savedBuffer.length >= msgLen()){
            callback(savedBuffer.slice(0, msgLen()));
            savedBuffer = savedBuffer.slice(msgLen());
            handshake = false;
        }
    }); // something something saves all messages, waits for the saved buffer to have the full message, then slices it
};

const msgHandler = (msg, socket, requested, queue){
   if(isHandshake(msg))
       socket.write(buildInterested());
   else{
       const m = parseMsg(msg);

       if (m.id === 0) chokeHandler();
       if (m.id === 1) unchokeHandler();
       if (m.id === 4) haveHandler(m.payload, socket, requested, queue);
       if (m.id === 5) bitfieldHandler(m.payload);
       if (m.id === 7) pieceHandler(m.payload, socket, requested, queue);
   }
};

const isHandshake = msg => {
    return msg.lenght === msg.readUInt8(0) + 49 &&
        msg.toString('utf8', 1) === 'BitTorrent protocol';
};

const chokeHandler = () => {

};

const unchokeHandler = () => {

};

const haveHandler = (payload, socket, requested, queue) => {
    const pieceIndex = payload.readUInt32BE(0);
    queue.push(piece.index)
    if(queue.lenght === 1){
        requestPiece(socket, requested, queue);
    }
};

const bitfieldHandler = payload => {

};

const pieceHandler = (payload, socket, requested, queue) => {
    queue.shift();
    requestPiece(socket, requested, queue);
};

const requestPiece = (socket, requested, queue) => {
    if(requested[queue[0]]){
        queue.shift();
    }
    else{
        //inb4
        //eventually will be correctly implemented
        socket.write(buildRequest(pieceIndex));
    }
};

export {
    downloadTorrent
}
